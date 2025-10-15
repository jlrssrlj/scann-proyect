// src/components/CategoriaList.tsx
import { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../api/categorias";
import CategoriasForm from "./CategoriasForm";

interface Categoria {
  id_categories: number;
  name_categories: string;
}

export default function CategoriaList() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const loadCategorias = () => {
    getCategories()
      .then((res) => {
        console.log("Respuesta API cruda:", res.data);

        // Extraemos el array de 'categorie'
        const categoriasArray: Categoria[] = res.data.categorie || [];

        setCategorias(categoriasArray);
      })
      .catch((err) => console.error("Error al obtener categorías:", err));
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar esta categoría?")) {
      try {
        await deleteCategory(id);
        loadCategorias();
      } catch (err) {
        console.error("Error al eliminar categoría:", err);
      }
    }
  };

  const openForm = (id: number | null = null) => {
    setSelectedId(id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100 p-10">
      <div className="w-full max-w-5xl bg-[#1e293b]/70 backdrop-blur-md border border-cyan-400/20 rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-cyan-400 mb-10 text-center tracking-wider">
          Gestión de Categorías
        </h1>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition-all"
          >
            <span className="text-xl">+</span> Nueva Categoría
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categorias.length > 0 ? (
            categorias.map((categoria) => (
              <div
                key={categoria.id_categories}
                className="bg-[#0f172a]/70 border border-cyan-400/20 rounded-2xl p-6 text-center shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1 transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
                  {categoria.name_categories}
                </h2>
                <p className="text-gray-400 mb-4 text-sm">ID: {categoria.id_categories}</p>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => openForm(categoria.id_categories)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded-lg font-semibold transition-all"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.id_categories)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg font-semibold transition-all"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300 col-span-full text-center mt-10">
              No hay categorías disponibles
            </p>
          )}
        </div>
      </div>

      {showForm && (
        <CategoriasForm
          categoriaId={selectedId}
          onClose={() => setShowForm(false)}
          onSaved={loadCategorias}
        />
      )}
    </div>
  );
}
