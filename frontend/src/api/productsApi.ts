// src/api/productsApi.ts
import axios from "axios";

const API_URL = "http://localhost:3000/api/products"; // Ajusta el puerto si es distinto

export interface Product {
  id_products: number;
  name_products: string;
  description: string;
  category_id: number | null;
  created_at: string;
  image_url: string | null;
}

// Obtener todos los productos
export const getProducts = () => axios.get(API_URL);

// Obtener un producto por ID
export const getProductById = (id: number) => axios.get(`${API_URL}/${id}`);

// Crear un nuevo producto
export const createProduct = (productData: Omit<Product, "id_products" | "created_at">) =>
  axios.post(API_URL, productData);

// Actualizar un producto existente
export const updateProduct = (id: number, productData: Partial<Product>) =>
  axios.put(`${API_URL}/${id}`, productData);

// Eliminar un producto
export const deleteProduct = (id: number) => axios.delete(`${API_URL}/${id}`);
