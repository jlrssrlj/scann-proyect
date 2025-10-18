// frontend/src/api/productsApi.ts
export interface Product {
  id_products: number;
  name_products: string;
  category_name: string;
  image_url: string;
}

// Cambia esta URL base por la de tu backend
const API_URL = "http://localhost:3000/api/products";

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

export const createProduct = async (product: Omit<Product, "id_products">): Promise<Product> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

export const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
};

export const deleteProduct = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
};
