export interface Products {
    id_products: number;
    name_products: string;
    description: string;
    image_url: string;
    category: { id: number | null; name: string }; 
    created_at: Date;
}
