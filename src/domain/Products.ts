export interface Products {
  id_products: number;
  name_products: string;
  description?: string;
  image_url?: string;
  created_at: Date;
  category?: {
    id: number | null;
    name: string;
  } | null;
}
