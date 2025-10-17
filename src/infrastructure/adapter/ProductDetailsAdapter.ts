import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-base";
import { ProductDetailsPort } from "../../domain/ProductdetailsPorts";
import { ProductDetails } from "../../domain/Productdetails";
import { ProductDetailsEntity } from "../entities/ProducDetailsEntities";

export class ProductDetailsAdapter implements ProductDetailsPort {
    private repository: Repository<ProductDetailsEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(ProductDetailsEntity);
    }

    private toDomain(entity: ProductDetailsEntity): ProductDetails {
        return {
            id_productdetails: entity.id_productdetails,
            product_id: entity.product_id,
            ingredients: entity.ingredients,
            nutritional_info: entity.nutritional_info,
            warnings: entity.warnings,
        };
    }

    private toEntity(domain: Omit<ProductDetails, "id_productdetails">): ProductDetailsEntity {
        const entity = new ProductDetailsEntity();
        entity.product_id = domain.product_id;
        entity.ingredients = domain.ingredients;
        entity.nutritional_info = domain.nutritional_info;
        entity.warnings = domain.warnings;
        return entity;
    }

    async createProductDetails(details: Omit<ProductDetails, "id_productdetails">): Promise<number> {
        const newEntity = this.repository.create(this.toEntity(details));
        const saved = await this.repository.save(newEntity);
        return saved.id_productdetails;
    }

    async getProductDetailsById(id: number): Promise<ProductDetails | null> {
        const found = await this.repository.findOneBy({ id_productdetails: id });
        return found ? this.toDomain(found) : null;
    }

    async getAllProductDetails(): Promise<ProductDetails[]> {
        const list = await this.repository.find();
        return list.map(this.toDomain);
    }

    async updateProductDetails(id: number, details: Partial<ProductDetails>): Promise<boolean> {
        const result = await this.repository.update({ id_productdetails: id }, details);
        return result.affected !== 0;
    }

    async deleteProductDetails(id: number): Promise<boolean> {
        const result = await this.repository.delete({ id_productdetails: id });
        return result.affected !== 0;
    }

    async getByProductId(product_id: number): Promise<ProductDetails | null> {
        const found = await this.repository.findOneBy({ product_id });
        return found ? this.toDomain(found) : null;
    }
}
