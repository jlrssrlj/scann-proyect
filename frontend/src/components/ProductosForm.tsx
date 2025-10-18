// src/components/ProductosForm.tsx
import { useEffect, useState } from "react";
import { createProduct, updateProduct, getProductById } from "../api/productsApi";
import { getCategories } from "../api/categorias";

interface ProductosFormProps {
  productId: number | null;
  onClose: () => void;
  onSaved: () => void;
}

interface Category {
  id_categories: number;
  name_categories: string;
}

export default function ProductosForm({ productId, onClose, onSaved }: ProductosFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data.categorie || []);
    });

    if (productId) {
      getProductById(productId).then((res) => {
        const p = res.data.product;
        setName(p.name_products);
        setDescription(p.description);
        setCategoryId(p.category_id);
        setImageUrl(p.image_url || "");
      });
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name_products: name,
      description,
      category_id: categoryId,
      image_url: imageUrl || null,
    };

    if (productId) {
      await updateProduct(productId, payload);
    } else {
      await createProduct(payload);
    }
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          {productId ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
        />

        <select
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : null)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        >
          <option value="">Sin categoría</option>
          {categories.map((cat) => (
            <option key={cat.id_categories} value={cat.id_categories}>
              {cat.name_categories}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="URL de imagen (opcional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
        />

        <div className="flex justify-center gap-3">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
