import axios from "axios";

const customersApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const customersApiEndpoint = "/customers";

type Customer = {
  name: string;
  phone?: string;
};

export const getCustomers = async () => {
  const response = await customersApi.get(customersApiEndpoint);
  return response.data;
}

export const getCustomer = async (id: string) => {
  const response = await customersApi.get(`${customersApiEndpoint}/${id}`);
  return response.data;
}

export const createCustomer = async (customer: Customer) => {
  const response = await customersApi.post(customersApiEndpoint, customer);
  return response.data;
}

export const updateCustomer = async (id: string, customer: Customer) => {
  const response = await customersApi.put(`${customersApiEndpoint}/${id}`, customer);
  return response.data;
}

export const deleteCustomer = async (id: string) => {
  const response = await customersApi.delete(`${customersApiEndpoint}/${id}`);
  return response.data;
}

export const deleteCustomers = async (ids: string[]) => {
  const response = await customersApi.delete(customersApiEndpoint, { data: { ids } });
  return response.data;
}