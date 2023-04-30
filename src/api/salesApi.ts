import axios from "axios";

const salesApi = axios.create({
  baseURL: "http://localhost:3000",
});

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

export const getSales = async () => {
  const response = await salesApi.get(salesApiEndpoint);
  return response.data;
}

export const getSale = async (id: string) => {
  const response = await salesApi.get(`${salesApiEndpoint}/${id}`);
  return response.data;
}

export const createSale = async (sale: Sale) => {
  const response = await salesApi.post(salesApiEndpoint, sale);
  return response.data;
}

export const updateSale = async (id: string, sale: Sale) => {
  const response = await salesApi.put(`${salesApiEndpoint}/${id}`, sale);
  return response.data;
}

export const deleteSale = async (id: string) => {
  const response = await salesApi.delete(`${salesApiEndpoint}/${id}`);
  return response.data;
}

export const deleteSales = async (ids: string[]) => {
  const response = await salesApi.delete(salesApiEndpoint, { data: { ids } });
  return response.data;
}
