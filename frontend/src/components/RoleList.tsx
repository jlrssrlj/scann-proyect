import { useEffect, useState } from "react";
import { getRoles, deleteRole } from "../api/rolesApi";
import RoleForm from "./RoleForm";

interface Role {
  id_role: number;
  name: string;
}

export default function RoleList() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const loadRoles = () => {
    getRoles()
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Error al obtener roles:", err));
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este rol?")) {
      await deleteRole(id);
      loadRoles();
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
          Gestión de Roles
        </h1>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition-all"
          >
            <span className="text-xl">+</span> Nuevo Rol
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.id_role}
              className="bg-[#0f172a]/70 border border-cyan-400/20 rounded-2xl p-6 text-center shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
                {role.name}
              </h2>
              <p className="text-gray-400 mb-4 text-sm">ID: {role.id_role}</p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => openForm(role.id_role)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-1 rounded-lg font-semibold transition-all"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(role.id_role)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg font-semibold transition-all"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <RoleForm
          roleId={selectedId}
          onClose={() => setShowForm(false)}
          onSaved={loadRoles}
        />
      )}
    </div>
  );
}
