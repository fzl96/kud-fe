import { kudApi } from "./calls";
import type { Sales, Sale } from "@/types";

export const salesApiEndpoint = "/sales";

export type SaleInput = {
  products: {
    id: string;
    quantity: number;
  };
  cash: number;
  change: number;
  customerId: string;
  customerType: string;
  customerName?: string;
  paymentMethod: string;
};

export type SaleUpdate = {
  amount: number;
  note?: string;
};

export const getSales = async (token: string) => {
  const response = await kudApi.get(salesApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const sales: {
    pagination: any,
    data: Sales[]
  } = response.data;
  return sales;
};

export const getSale = async (id: string) => {
  const response = await kudApi.get(`${salesApiEndpoint}/${id}`);
  const sale: Sale = response.data;
  return sale;
};

export const createSale = async (sale: SaleInput) => {
  const response = await kudApi.post(salesApiEndpoint, sale);
  return response.data;
};

export const updateSale = async (id: string, data: SaleUpdate) => {
  const response = await kudApi.put(`${salesApiEndpoint}/${id}`, data);
  return response.data;
};

export const deleteSale = async (id: string) => {
  const response = await kudApi.delete(`${salesApiEndpoint}/${id}`);
  return response.data;
};

export const deleteSales = async (ids: string[]) => {
  const response = await kudApi.delete(salesApiEndpoint, { data: { ids } });
  return response.data;
};
