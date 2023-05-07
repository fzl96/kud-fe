import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const authApiEndpoint = '/auth';

type Credentials = {
  username: string;
  password: string;
};

export const login = async (credentials: Credentials) => {
  const response = await authApi.post(`${authApiEndpoint}/signin`, credentials);
  return response.data;
}

export const getToken = async () => {
  const response = await authApi.get(`${authApiEndpoint}/token`);
  return response.data;
}

export const logout = async () => {
  const response = await authApi.delete(`${authApiEndpoint}/signout`);
  return response.data;
}
