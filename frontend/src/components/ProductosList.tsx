// frontend/src/components/ProductosList.tsx
import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api/productsApi";
import type { Product } from "../api/productsApi";

import ProductosForm from "./ProductosForm";

const ProductosList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error cargando productos", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div>
      <h2>📦 Lista de Productos</h2>
      <ProductosForm
        onSuccess={fetchProducts}
        productToEdit={productToEdit}
        clearEdit={() => setProductToEdit(null)}
      />
      <ul>
        {products.map((p) => (
          <li key={p.id_products} style={{ marginBottom: "0.5rem" }}>
            <img
              src={p.image_url}
              alt={p.name_products}
              width="50"
              style={{ marginRight: "0.5rem" }}
            />
            <strong>{p.name_products}</strong> - {p.category_name}
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={() => setProductToEdit(p)}
            >
              Editar
            </button>
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={() => handleDelete(p.id_products)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosList;
