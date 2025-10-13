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

  private toDomain(product: ProductEntity): ProductDomain {
    return {
      id_products: product.id_products,
      name_products: product.name_products,
      description: product.description,
      image_url: product.image_url,
      category: product.category.id_categories,
      created_at: product.created_at,
    };
  }

  private toEntity(product: Omit<ProductDomain, "id_products">): ProductEntity {
    const productEntity = new ProductEntity();
    productEntity.name_products = product.name_products;
    productEntity.description = product.description;
    productEntity.image_url = product.image_url;
    productEntity.created_at = product.created_at;
    productEntity.category = { id_categories: product.category } as any;
    return productEntity;
  }

  async createProduct(product: Omit<ProductDomain, "id_products">): Promise<number> {
    try {
      const newProduct = this.toEntity(product);
      const savedProduct = await this.productRepository.save(newProduct);
      return savedProduct.id_products;
    } catch (error) {
      console.error("Error creando producto:", error);
      throw new Error("Error creating product");
    }
  }

  async getProductById(id: number): Promise<ProductDomain | null> {
    try {
      const product = await this.productRepository.findOne({
        where: { id_products: id },
        relations: ["category"], // 👈 se añadió
      });
      return product ? this.toDomain(product) : null;
    } catch (error) {
      console.error("Error obteniendo el producto:", error);
      throw new Error("Error getting product");
    }
  }

  async getAllProducts(): Promise<ProductDomain[]> {
    try {
      const products = await this.productRepository.find({
        relations: ["category"], // 👈 también aquí para evitar error
      });
      return products.map((u) => this.toDomain(u));
    } catch (error) {
      console.error("Error obteniendo productos:", error);
      throw new Error("Error getting products");
    }
  }

  async updateProduct(id: number, product: Partial<ProductDomain>): Promise<boolean> {
    try {
      const existingProduct = await this.productRepository.findOne({
        where: { id_products: id },
        relations: ["category"],
      });
      if (!existingProduct) throw new Error("Product not found");

      Object.assign(existingProduct, {
        name_products: product.name_products ?? existingProduct.name_products,
        description: product.description ?? existingProduct.description,
        image_url: product.image_url ?? existingProduct.image_url,
        created_at: product.created_at ?? existingProduct.created_at,
        category: product.category
          ? ({ id_categories: product.category } as any)
          : existingProduct.category,
      });

      await this.productRepository.save(existingProduct);
      return true;
    } catch (error) {
      console.error("Error al actualizar:", error);
      throw new Error("Error updating product");
    }
  }

  async getProductsByname(name_products: string): Promise<ProductDomain | null> {
    try {
      const product = await this.productRepository.findOne({
        where: { name_products },
        relations: ["category"], // 👈 se añadió
      });
      return product ? this.toDomain(product) : null;
    } catch (error) {
      console.error("Error obteniendo producto por nombre:", error);
      throw new Error("Error getting product by name");
    }
  }

  async deleteProduct(id_products: number): Promise<boolean> {
    const result = await this.productRepository.delete({ id_products });
    return result.affected !== 0;
  }

  async getProductByCategory(category_id: number): Promise<ProductDomain[]> {
    try {
      const products = await this.productRepository.find({
        where: { category: { id_categories: category_id } },
        relations: ["category"],
      });
      return products.map((p) => this.toDomain(p));
    } catch (error) {
      console.error("Error obteniendo productos por categoría:", error);
      throw new Error("Error getting products by category");
    }
  }
}
