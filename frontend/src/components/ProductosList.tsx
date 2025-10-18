// src/components/ProductosList.tsx
import { useEffect, useState } from "react";
import { getProducts, deleteProduct, type Product } from "../api/productsApi";
import ProductosForm from "./ProductosForm";

export default function ProductosList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const loadProducts = () => {
    getProducts()
      .then((res) => {
        setProducts(res.data.products || []);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este producto?")) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (err) {
        console.error("Error al eliminar producto:", err);
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
          Gestión de Productos
        </h1>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition-all"
          >
            <span className="text-xl">+</span> Nuevo Producto
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((p) => (
              <div
                key={p.id_products}
                className="bg-[#0f172a]/70 border border-cyan-400/20 rounded-2xl p-6 text-center shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1 transition-all duration-300"
              >
                <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
                  {p.name_products}
                </h2>
                <p className="text-gray-400 mb-2 text-sm">{p.description}</p>
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.name_products}
                    className="mx-auto rounded-lg mb-3 max-h-40 object-cover"
                  />
                )}
                <p className="text-gray-500 text-xs mb-4">ID: {p.id_products}</p>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => openForm(p.id_products)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded-lg font-semibold transition-all"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id_products)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg font-semibold transition-all"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300 col-span-full text-center mt-10">
              No hay productos disponibles
            </p>
          )}
        </div>
      </div>

      {showForm && (
        <ProductosForm
          productId={selectedId}
          onClose={() => setShowForm(false)}
          onSaved={loadProducts}
        />
      )}
    </div>
  );
}
