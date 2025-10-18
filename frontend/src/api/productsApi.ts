import axios from "axios";

const API_URL = "http://localhost:4000/api/products";

export interface Product {
  id_products: number;
  name_products: string;
  description?: string;
  image_url?: string;
  category?: {
    id_categories: number;
    name_categories: string;
  } | null;
  created_at: string;
}

// Crear producto
export const createProduct = (productData: {
  name_products: string;
  description?: string;
  image_url?: string | null;
  category_id?: number | null;
}) => axios.post(API_URL, productData);

// Actualizar producto
export const updateProduct = (
  id: number,
  productData: {
    name_products?: string;
    description?: string;
    image_url?: string | null;
    category_id?: number | null;
  }
) => axios.put(`${API_URL}/${id}`, productData);

// Obtener todos los productos
export const getProducts = () => axios.get(API_URL);

// Obtener producto por ID
export const getProductById = (id: number) => axios.get(`${API_URL}/${id}`);

// Eliminar producto por ID
export const deleteProduct = (id: number) => axios.delete(`${API_URL}/${id}`);
