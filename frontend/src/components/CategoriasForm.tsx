// src/components/CategoriasForm.tsx
import { useState, useEffect } from "react";
import { createCategory, updateCategory, getCategoryById } from "../api/categorias";

interface CategoriasFormProps {
  categoriaId: number | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function CategoriasForm({ categoriaId, onClose, onSaved }: CategoriasFormProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (categoriaId) {
      getCategoryById(categoriaId).then((res) => setName(res.data.name_categories));
    }
  }, [categoriaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categoriaId) {
      await updateCategory(categoriaId, { name_categories: name });
    } else {
      await createCategory({ name_categories: name });
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
          {categoriaId ? "Editar Categoría" : "Nueva Categoría"}
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de la categoría"
          required
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
