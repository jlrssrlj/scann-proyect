import { useState, useEffect } from "react";
import { createRole, updateRole, getRoleById } from "../api/rolesApi";

interface RoleFormProps {
  roleId: number | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function RoleForm({ roleId, onClose, onSaved }: RoleFormProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (roleId) {
      getRoleById(roleId).then((res) => setName(res.data.name));
    }
  }, [roleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (roleId) {
      await updateRole(roleId, { name });
    } else {
      await createRole({ name });
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
          {roleId ? "Editar Rol" : "Nuevo Rol"}
        </h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del rol"
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
