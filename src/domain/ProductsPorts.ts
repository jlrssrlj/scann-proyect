import { Products } from "./Products";

export interface ProductsPort {
  createProduct(product: Omit<Products, "id_products">): Promise<number>;
  getProductById(id: number): Promise<Products | null>;
  getProductsByname(name: string): Promise<Products | null>;
  updateProduct(id: number, product: Partial<Products>): Promise<boolean>;
  deleteProduct(id: number): Promise<boolean>;
  getAllProducts(): Promise<Products[]>;
  getProductByCategory(category_id: number): Promise<Products[]>;
}
