import axios from "axios";
import { kudApi } from "./calls";

export const customersApiEndpoint = "/customers";

type Customer = {
  name: string;
  phone?: string;
};

export const getCustomers = async (token: string) => {
  const response = await kudApi.get(customersApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const getCustomer = async (id: string) => {
  const response = await kudApi.get(`${customersApiEndpoint}/${id}`);
  return response.data;
}

export const createCustomer = async (customer: Customer) => {
  const response = await kudApi.post(customersApiEndpoint, customer);
  return response.data;
}

export const updateCustomer = async (id: string, customer: Customer) => {
  const response = await kudApi.put(`${customersApiEndpoint}/${id}`, customer);
  return response.data;
}

export const deleteCustomer = async (id: string) => {
  const response = await kudApi.delete(`${customersApiEndpoint}/${id}`);
  return response.data;
}

export const deleteCustomers = async (ids: string[]) => {
  const response = await kudApi.delete(customersApiEndpoint, { data: { ids } });
  return response.data;
}