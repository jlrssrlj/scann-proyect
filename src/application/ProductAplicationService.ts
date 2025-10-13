import { Products } from "../domain/Products";
import { ProductsPort } from "../domain/ProductsPorts";

export class ProductAplicationService {
  private port: ProductsPort;

  constructor(port: ProductsPort) {
    this.port = port;
  }

  async createProduct(product: Omit<Products, "id_products">): Promise<number> {
    const existingProduct = await this.port.getProductsByname(product.name_products);
    if (!existingProduct) {
      return await this.port.createProduct(product);
    }
    throw new Error("Ese producto ya existe");
  }

  async getProductByname(name: string): Promise<Products | null> {
    return await this.port.getProductsByname(name);
  }

  async getProductById(id: number): Promise<Products | null> {
    return await this.port.getProductById(id);
  }

  async getAllProduct(): Promise<Products[]> {
    return await this.port.getAllProducts();
  }

  async updateProduct(id: number, product: Partial<Products>): Promise<boolean> {
    const existingProduct = await this.port.getProductById(id);
    if (!existingProduct) {
      throw new Error("Producto no encontrado");
    }

    if (product.name_products) {
      const nameTaken = await this.port.getProductsByname(product.name_products);
      if (nameTaken && nameTaken.id_products !== id) {
        throw new Error("El producto ya existe");
      }
    }

    return await this.port.updateProduct(id, product);
  }

  async deleteProduct(id: number): Promise<boolean> {
    const existingProduct = await this.port.getProductById(id);
    if (!existingProduct) {
      throw new Error("Producto no encontrado");
    }
    return await this.port.deleteProduct(id);
  }

  async getProductsByCategory(category_id: number): Promise<Products[]> {
    return await this.port.getProductByCategory(category_id);
  }
}
