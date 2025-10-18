import axios from "axios";

const API_URL = "http://localhost:4000/api/roles";


export const getRoles = async () => axios.get(API_URL);
export const getRoleById = async (id: number) => axios.get(`${API_URL}/${id}`);
export const createRole = async (data: { name: string }) => axios.post(API_URL, data);
export const updateRole = async (id: number, data: { name: string }) => axios.put(`${API_URL}/${id}`, data);
export const deleteRole = async (id: number) => axios.delete(`${API_URL}/${id}`);
