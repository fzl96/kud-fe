import { kudApi } from "./calls";

export const rolesApiEndpoint = "/roles";

type Role = {
  name: string;
  permissions: string[];
};

export const getRoles = async (token: string) => {
  const response = await kudApi.get(rolesApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const getRole = async (id: string) => {
  const response = await kudApi.get(`${rolesApiEndpoint}/${id}`);
  return response.data;
}

export const createRole = async (role: Role) => {
  const response = await kudApi.post(rolesApiEndpoint, role);
  return response.data;
}

export const updateRole = async (id: string, role: Role) => {
  const response = await kudApi.put(`${rolesApiEndpoint}/${id}`, role);
  return response.data;
}

export const deleteRole = async (id: string) => {
  const response = await kudApi.delete(`${rolesApiEndpoint}/${id}`);
  return response.data;
}

export const deleteRoles = async (ids: string[]) => {
  const response = await kudApi.delete(rolesApiEndpoint, { data: { ids } });
  return response.data;
}