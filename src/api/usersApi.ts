import axios from "axios";

const usersApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const usersApiEndpoint = "/users";

type User = {
  name: string;
  email: string;
  password: string;
  roleId: string;
};

export const getUsers = async () => {
  const response = await usersApi.get(usersApiEndpoint);
  return response.data;
}

export const getUser = async (id: string) => {
  const response = await usersApi.get(`${usersApiEndpoint}/${id}`);
  return response.data;
}

export const createUser = async (user: User) => {
  const response = await usersApi.post(usersApiEndpoint, user);
  return response.data;
}

export const updateUser = async (id: string, user: User) => {
  const response = await usersApi.put(`${usersApiEndpoint}/${id}`, user);
  return response.data;
}

export const deleteUser = async (id: string) => {
  const response = await usersApi.delete(`${usersApiEndpoint}/${id}`);
  return response.data;
}

export const deleteUsers = async (ids: string[]) => {
  const response = await usersApi.delete(usersApiEndpoint, { data: { ids } });
  return response.data;
}