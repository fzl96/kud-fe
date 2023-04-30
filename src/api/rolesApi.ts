import axios from "axios";

const rolesApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const rolesApiEndpoint = "/roles";

type Role = {
  name: string;
  permissions: string[];
};

export const getRoles = async () => {
  const response = await rolesApi.get(rolesApiEndpoint);
  return response.data;
}

export const getRole = async (id: string) => {
  const response = await rolesApi.get(`${rolesApiEndpoint}/${id}`);
  return response.data;
}

export const createRole = async (role: Role) => {
  const response = await rolesApi.post(rolesApiEndpoint, role);
  return response.data;
}

export const updateRole = async (id: string, role: Role) => {
  const response = await rolesApi.put(`${rolesApiEndpoint}/${id}`, role);
  return response.data;
}

export const deleteRole = async (id: string) => {
  const response = await rolesApi.delete(`${rolesApiEndpoint}/${id}`);
  return response.data;
}

export const deleteRoles = async (ids: string[]) => {
  const response = await rolesApi.delete(rolesApiEndpoint, { data: { ids } });
  return response.data;
}