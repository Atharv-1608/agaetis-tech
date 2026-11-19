import type { Employee, EmployeeInput } from "../types/employee";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// GET employees
export const getEmployees = async (): Promise<Employee[]> => {
  const response = await api.get("/employees");
  return response.data;
};

// POST employee
export const addEmployee = async (
  employee: EmployeeInput
): Promise<Employee> => {
  const response = await api.post("/employees", employee);
  return response.data;
};

// PUT employee
export const updateEmployee = async (
  id: number,
  employee: EmployeeInput
): Promise<Employee> => {
  const response = await api.put(`/employees/${id}`, employee);
  return response.data;
};

// DELETE employee
export const deleteEmployee = async (id: number) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};