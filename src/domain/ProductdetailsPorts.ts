import { ProductDetails } from "./Productdetails";

export interface ProductDetailsPort {
    createProductDetails(details: Omit<ProductDetails, "id_productdetails">): Promise<number>;
    getProductDetailsById(id: number): Promise<ProductDetails | null>;
    getAllProductDetails(): Promise<ProductDetails[]>;
    updateProductDetails(id: number, details: Partial<ProductDetails>): Promise<boolean>;
    deleteProductDetails(id: number): Promise<boolean>;
    getByProductId(product_id: number): Promise<ProductDetails | null>;
}
