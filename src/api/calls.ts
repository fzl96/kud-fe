import axios from 'axios';

export const kudApi = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});