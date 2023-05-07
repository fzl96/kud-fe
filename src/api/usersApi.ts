import { kudApi } from "./calls";

export const usersApiEndpoint = "/users";

type User = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: string;
};

export const getUsers = async (token: string) => {
  const response = await kudApi.get(`${usersApiEndpoint}?include_roles=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const getUser = async (id: string) => {
  const response = await kudApi.get(`${usersApiEndpoint}/${id}`);
  return response.data;
}

export const createUser = async (user: User) => {
  console.log(user);
  const response = await kudApi.post(usersApiEndpoint, user);
  return response.data;
}

export const updateUser = async (id: string, user: User) => {
  const response = await kudApi.put(`${usersApiEndpoint}/${id}`, user);
  return response.data;
}

export const deleteUser = async (id: string) => {
  const response = await kudApi.delete(`${usersApiEndpoint}/${id}`);
  return response.data;
}

export const deleteUsers = async (ids: string[]) => {
  const response = await kudApi.delete(usersApiEndpoint, { data: { ids } });
  return response.data;
}