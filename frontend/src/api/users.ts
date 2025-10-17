import axios from "axios";

const API_URL = "http://localhost:4000/api/login";

export interface User {
  id_users: number;
  name: string;
  email: string;
  password_hash: string;
  role_id: number;
  create_at: Date;
}

// Interfaz para crear usuario o login
export interface UserInput {
  name?: string; // opcional para login
  email: string;
  password: string;
}

// Crear un usuario nuevo
export const createUser = async (userData: UserInput) => {
  const response = await axios.post(`${API_URL}`, userData);
  return response.data;
};

// Obtener todos los usuarios
export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener usuario por ID
export const getUserById = async (id: number): Promise<User> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Obtener usuario por email
export const getUserByEmail = async (email: string): Promise<User> => {
  const response = await axios.get(`${API_URL}-email/${email}`);
  return response.data;
};

// Actualizar usuario
export const updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<boolean> => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

// Eliminar usuario
export const deleteUser = async (id: number): Promise<boolean> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Login de usuario
export const loginUser = async (credentials: UserInput) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

// 🔹 Logout: eliminar token del localStorage
export const logoutUser = () => {
  localStorage.removeItem("token");
};
