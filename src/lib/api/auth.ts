import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const authApiEndpoint = "/auth";

type Credentials = {
  username: string;
  password: string;
};

export const login = async (credentials: Credentials) => {
  const response = await authApi.post(`${authApiEndpoint}/signin`, credentials);
  return response.data;
};

export const getToken = async () => {
  const response = await authApi.get(`${authApiEndpoint}/token`);
  return response.data;
};

export const logout = async () => {
  const response = await authApi.delete(`${authApiEndpoint}/signout`);
  return response.data;
};
