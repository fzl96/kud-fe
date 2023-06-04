import { kudApi } from "./calls";
import { Customer } from "@/types";

export const customersApiEndpoint = "/customers";

type CustomerInput = {
  name: string;
  phone?: string;
  groupId?: string;
  status?: string;
};

export const getCustomers = async (token: string) => {
  const response = await kudApi.get(customersApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const customers: Customer[] = response.data;
  return customers;
};

export const getCustomer = async (
  id: string,
  withSales: boolean,
  year?: number,
  month?: number
) => {
  let endPoint = `${customersApiEndpoint}/${id}`;
  if (withSales) {
    endPoint += `?include_sales=${withSales}&year=${year}&month=${month}`;
  } else {
    endPoint += `?include_sales=${withSales}`;
  }
  const response = await kudApi.get(endPoint);
  const customer: Customer = response.data;
  return customer;
};

export const createCustomer = async (customer: CustomerInput) => {
  const response = await kudApi.post(customersApiEndpoint, customer);
  return response.data;
};

export const updateCustomer = async (id: string, customer: CustomerInput) => {
  const response = await kudApi.put(`${customersApiEndpoint}/${id}`, customer);
  return response.data;
};

export const deleteCustomer = async (id: string) => {
  const response = await kudApi.delete(`${customersApiEndpoint}/${id}`);
  return response.data;
};

export const deleteCustomers = async (ids: string[]) => {
  const response = await kudApi.delete(customersApiEndpoint, { data: { ids } });
  return response.data;
};
