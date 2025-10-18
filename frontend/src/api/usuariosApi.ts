import axios from "axios";
import type { Role } from "./rolesApi"; // 

const API_URL = "http://localhost:4000/api/users";

export interface User {
  id_users: number;
  name: string;
  email: string;
  password_hash: string;
  role_id: number | null;
  created_at: string;
  role?: Role; 
}

export const getUsers = async () => { return axios.get<User[]>(API_URL); };
export const getUserById = async (id: number) => { return axios.get<User>(`${API_URL}/${id}`); };
export const createUser = async ( userData: Omit<User, "id_users" | "created_at" | "password_hash" | "role"> & { password: string; } ) => { return axios.post<User>(API_URL, userData); };
export const updateUser = async ( id: number, userData: Partial<User> & { password?: string } ) => { return axios.put<User>(`${API_URL}/${id}`, userData);};
export const deleteUser = async (id: number) => { return axios.delete(`${API_URL}/${id}`);};
