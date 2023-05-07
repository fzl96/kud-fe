import { kudApi } from "./calls";

export const salesApiEndpoint = "/sales";

export type Sale = {
  products: {
    id: string;
    quantity: number;
  };
  cash: number;
  change: number;
  customerId: string;
};

export const getSales = async (token: string) => {
  const response = await kudApi.get(salesApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const getSale = async (id: string) => {
  const response = await kudApi.get(`${salesApiEndpoint}/${id}`);
  return response.data;
}

export const createSale = async (sale: Sale) => {
  const response = await kudApi.post(salesApiEndpoint, sale);
  return response.data;
}

export const updateSale = async (id: string, sale: Sale) => {
  const response = await kudApi.put(`${salesApiEndpoint}/${id}`, sale);
  return response.data;
}

export const deleteSale = async (id: string) => {
  const response = await kudApi.delete(`${salesApiEndpoint}/${id}`);
  return response.data;
}

export const deleteSales = async (ids: string[]) => {
  const response = await kudApi.delete(salesApiEndpoint, { data: { ids } });
  return response.data;
}
