import { useEffect, useState } from "react";
import { createUser, updateUser, getUserById } from "../api/usuariosApi";
import { getRoles, type Role } from "../api/rolesApi";
import type { User } from "../api/usuariosApi";

interface UsuariosFormProps {
  userId: number | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function UsuariosForm({ userId, onClose, onSaved }: UsuariosFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState<number | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    getRoles().then((res) => {
      setRoles(res.data.roles || []);
    });

    if (userId) {
      getUserById(userId).then((res) => {
        const u = res.data;
        setName(u.name);
        setEmail(u.email);
        setRoleId(u.role_id);
      });
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setRoleId(null);
    }
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Partial<User> & { password?: string } = {
      name,
      email,
      role_id: roleId,
    };

    if (password.trim()) {
      payload.password = password;
    }

    if (userId) {
      await updateUser(userId, payload);
    } else {
      await createUser(payload as Omit<User, "id_users" | "create_at" | "password_hash"> & { password: string });
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
          {userId ? "Editar Usuario" : "Nuevo Usuario"}
        </h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        />

        {!userId && (
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
        )}

        {userId && (
          <input
            type="password"
            placeholder="Nueva contraseña (opcional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
        )}

        <select
          value={roleId ?? ""}
          onChange={(e) => setRoleId(e.target.value ? Number(e.target.value) : null)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        >
          <option value="">Sin rol</option>
          {roles.map((r) => (
            <option key={r.id_roles} value={r.id_roles}>
              {r.name_roles}
            </option>
          ))}
        </select>

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
