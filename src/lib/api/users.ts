import { kudApi } from "./calls";
import type { UserWithRole, User } from "@/types";

export const usersApiEndpoint = "/users";

type UserInput = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  roleId: string;
};

type UserUpdateInput = {
  name: string;
  username: string;
  roleId: string;
  newPassword?: string;
  confirmPassword?: string;
  currentPassword?: string;
};

export const getUsers = async (token: string) => {
  const response = await kudApi.get(`${usersApiEndpoint}?include_roles=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const usersWithRoles: UserWithRole = response.data;
  return usersWithRoles;
};

export const getUser = async (id: string) => {
  const response = await kudApi.get(`${usersApiEndpoint}/${id}`);
  const user: User = response.data;
  return user;
};

export const createUser = async (user: UserInput) => {
  const response = await kudApi.post(usersApiEndpoint, user);
  return response.data;
};

export const updateUser = async (id: string, user: UserUpdateInput) => {
  const response = await kudApi.put(`${usersApiEndpoint}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await kudApi.delete(`${usersApiEndpoint}/${id}`);
  return response.data;
};

export const deleteUsers = async (ids: string[]) => {
  const response = await kudApi.delete(usersApiEndpoint, { data: { ids } });
  return response.data;
};
