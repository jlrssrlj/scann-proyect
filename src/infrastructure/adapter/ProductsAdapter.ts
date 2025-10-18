import { Repository } from "typeorm";
import { Products as ProductDomain } from "../../domain/Products";
import { ProductsEntities as ProductEntity } from "../entities/ProductsEntities";
import { ProductsPort } from "../../domain/ProductsPorts";
import { AppDataSource } from "../config/data-base";

export class ProductAdapter implements ProductsPort {
  private productRepository: Repository<ProductEntity>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(ProductEntity);
  }

  // Convierte la entidad de DB al modelo de dominio
  private toDomain(product: ProductEntity): ProductDomain {
    return {
      id_products: product.id_products,
      name_products: product.name_products,
      description: product.description,
      image_url: product.image_url,
      created_at: product.created_at,
      category: product.category
        ? { id: product.category.id_categories, name: product.category.name_categories }
        : null,
    };
  }

  // Convierte el modelo de dominio a entidad para guardar
  private toEntity(product: Omit<ProductDomain, "id_products">): ProductEntity {
    const productEntity = new ProductEntity();
    productEntity.name_products = product.name_products;
    productEntity.description = product.description;
    productEntity.image_url = product.image_url;
    productEntity.created_at = product.created_at;
    // Guardamos solo la FK de la categoría
    productEntity.category = product.category?.id
      ? { id_categories: product.category.id } as ProductEntity["category"]
      : null;
    return productEntity;
  }

  async createProduct(product: Omit<ProductDomain, "id_products">): Promise<number> {
    const newProduct = this.toEntity(product);
    const savedProduct = await this.productRepository.save(newProduct);
    return savedProduct.id_products;
  }

  async getProductById(id: number): Promise<ProductDomain | null> {
    const product = await this.productRepository.findOne({
      where: { id_products: id },
      relations: ["category"],
    });
    return product ? this.toDomain(product) : null;
  }

  async getAllProducts(): Promise<ProductDomain[]> {
    const products = await this.productRepository.find({ relations: ["category"] });
    return products.map((p) => this.toDomain(p));
  }

  async updateProduct(id: number, product: Partial<ProductDomain> & { category_id?: number | null }): Promise<boolean> {
    const existingProduct = await this.productRepository.findOne({
      where: { id_products: id },
      relations: ["category"],
    });
    if (!existingProduct) throw new Error("Producto no encontrado");

    // Actualizamos campos básicos
    existingProduct.name_products = product.name_products ?? existingProduct.name_products;
    existingProduct.description = product.description ?? existingProduct.description;
    existingProduct.image_url = product.image_url ?? existingProduct.image_url;
    existingProduct.created_at = product.created_at ?? existingProduct.created_at;

    // Actualizamos categoría correctamente
    if (product.category_id !== undefined) {
      existingProduct.category = product.category_id
        ? { id_categories: product.category_id } as ProductEntity["category"]
        : null;
    }

    await this.productRepository.save(existingProduct);
    return true;
  }

  async getProductsByname(name_products: string): Promise<ProductDomain | null> {
    const product = await this.productRepository.findOne({
      where: { name_products },
      relations: ["category"],
    });
    return product ? this.toDomain(product) : null;
  }

  async deleteProduct(id_products: number): Promise<boolean> {
    const result = await this.productRepository.delete({ id_products });
    return result.affected !== 0;
  }

  async getProductByCategory(category_id: number): Promise<ProductDomain[]> {
    const products = await this.productRepository.find({
      where: { category: { id_categories: category_id } },
      relations: ["category"],
    });
    return products.map((p) => this.toDomain(p));
  }
}
