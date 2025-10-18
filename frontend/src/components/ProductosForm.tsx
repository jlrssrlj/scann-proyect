// frontend/src/components/ProductosForm.tsx
import React, { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../api/productsApi";
import type { Product } from "../api/productsApi";


interface Props {
  onSuccess: () => void;
  productToEdit: Product | null;
  clearEdit: () => void;
}

const ProductosForm: React.FC<Props> = ({ onSuccess, productToEdit, clearEdit }) => {
  const [formData, setFormData] = useState<Omit<Product, "id_products">>({
    name_products: "",
    category_name: "",
    image_url: "",
  });

  useEffect(() => {
    if (productToEdit) {
      const { name_products, category_name, image_url } = productToEdit;
      setFormData({ name_products, category_name, image_url });
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productToEdit) {
      await updateProduct(productToEdit.id_products, formData);
      clearEdit();
    } else {
      await createProduct(formData);
    }
    onSuccess();
    setFormData({ name_products: "", category_name: "", image_url: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        name="name_products"
        placeholder="Nombre"
        value={formData.name_products}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category_name"
        placeholder="Categoría"
        value={formData.category_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image_url"
        placeholder="URL de imagen"
        value={formData.image_url}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {productToEdit ? "Actualizar" : "Agregar"}
      </button>
      {productToEdit && (
        <button type="button" onClick={clearEdit} style={{ marginLeft: "0.5rem" }}>
          Cancelar
        </button>
      )}
    </form>
  );
};

export default ProductosForm;
