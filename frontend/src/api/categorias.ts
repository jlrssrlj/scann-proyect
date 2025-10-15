// src/api/categories.ts
import axios from "axios";

const API_URL = "http://localhost:4000/api/categorias";


export const getCategories = async () => axios.get(API_URL);
export const getCategoryById = async (id: number) => axios.get(`${API_URL}/${id}`);
export const getCategoryByName = async (name: string) => axios.get(`${API_URL}/categorias-name/${name}`);
export const createCategory = async (data: { name_categories: string }) => axios.post(API_URL, data);
export const updateCategory = async (id: number, data: { name_categories: string }) =>   axios.put(`${API_URL}/${id}`, data);
export const deleteCategory = async (id: number) => axios.delete(`${API_URL}/${id}`);
