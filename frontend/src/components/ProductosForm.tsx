import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
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
  const [name_products, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar categorías
  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data.categorie || []);
      })
      .catch((err) => console.error("Error cargando categorías:", err));
  }, []);

  // Cargar producto si se edita
  useEffect(() => {
    if (productId) {
      setLoading(true);
      getProductById(productId)
        .then((res) => {
          const p = res.data;
          setName(p.name_products || "");
          setDescription(p.description || "");
          setImageUrl(p.image_url || "");
          setCategoryId(p.category?.id ?? null);
        })
        .catch((err) => console.error("Error cargando producto:", err))
        .finally(() => setLoading(false));
    } else {
      setName("");
      setDescription("");
      setImageUrl("");
      setCategoryId(null);
    }
  }, [productId]);

  // Guardar o actualizar producto
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const productData = {
      name_products,
      description,
      image_url: image_url || null,
      category_id: categoryId,
    };

    try {
      if (productId) {
        await updateProduct(productId, productData);
        alert("Producto actualizado correctamente");
      } else {
        await createProduct(productData);
        alert("Producto creado correctamente");
      }

      onSaved(); // Refresca la lista de productos
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(`Error guardando producto: ${err.message}`);
    }
  };

  if (loading) return <p className="text-white">Cargando producto...</p>;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          {productId ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <input
          type="text"
          value={name_products}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          placeholder="Nombre del producto"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4 text-black"
        />

        <textarea
          value={description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          placeholder="Descripción"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4 text-black"
        />

        <select
          value={categoryId ?? ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setCategoryId(e.target.value ? parseInt(e.target.value) : null)
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4 text-black bg-white"
        >
          <option value="">Sin categoría</option>
          {categories.map((c) => (
            <option key={c.id_categories} value={c.id_categories}>
              {c.name_categories}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={image_url}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
          placeholder="URL de la imagen (opcional)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none mb-4 text-black"
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
