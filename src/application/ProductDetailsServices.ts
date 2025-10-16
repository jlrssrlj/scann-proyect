import { ProductDetailsPort } from "../domain/ProductdetailsPorts";
import { ProductDetails } from "../domain/Productdetails";

export class ProductDetailsApplicationService {
    private port: ProductDetailsPort;

    constructor(port: ProductDetailsPort) {
        this.port = port;
    }

    create(details: Omit<ProductDetails, "id_productdetails">): Promise<number> {
        return this.port.createProductDetails(details);
    }

    getAll(): Promise<ProductDetails[]> {
        return this.port.getAllProductDetails();
    }

    getById(id: number): Promise<ProductDetails | null> {
        return this.port.getProductDetailsById(id);
    }

    getByProductId(product_id: number): Promise<ProductDetails | null> {
        return this.port.getByProductId(product_id);
    }

    update(id: number, details: Partial<ProductDetails>): Promise<boolean> {
        return this.port.updateProductDetails(id, details);
    }

    delete(id: number): Promise<boolean> {
        return this.port.deleteProductDetails(id);
    }
}
