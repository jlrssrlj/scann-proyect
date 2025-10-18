import axios from "axios";

const API_URL = "http://localhost:4000/api/roles";

export interface Role {
  id_roles: number;
  name: string;
  created_at: string;
}

// ✅ Obtener todos los roles
export const getRoles = async () => {
  return axios.get<Role[]>(API_URL);
};

// ✅ Obtener un rol por ID
export const getRoleById = async (id: number) => {
  return axios.get<Role>(`${API_URL}/${id}`);
};

// ✅ Crear rol
export const createRole = async (data: { name: string }) => {
  return axios.post<Role>(API_URL, data);
};

// ✅ Actualizar rol
export const updateRole = async (id: number, data: { name: string }) => {
  return axios.put<Role>(`${API_URL}/${id}`, data);
};

// ✅ Eliminar rol
export const deleteRole = async (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};
