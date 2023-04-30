import axios from "axios";

const purchasesApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const purchasesApiEndpoint = "/purchases";

type Item = {
  id: string;
  purchasePrice: number;
  quantity: number;
};

type Purchase = {
  supplierId: string;
  items: Item[];
};

export const getPurchases = async () => {
  const response = await purchasesApi.get(purchasesApiEndpoint);
  return response.data;
}

export const getPurchase = async (id: string) => {
  const response = await purchasesApi.get(`${purchasesApiEndpoint}/${id}`);
  return response.data;
}

export const createPurchase = async (purchase: Purchase) => {
  const response = await purchasesApi.post(purchasesApiEndpoint, purchase);
  return response.data;
}

export const updatePurchase = async (id: string, purchase: Purchase) => {
  const response = await purchasesApi.put(`${purchasesApiEndpoint}/${id}`, purchase);
  return response.data;
}

export const deletePurchase = async (id: string) => {
  const response = await purchasesApi.delete(`${purchasesApiEndpoint}/${id}`);
  return response.data;
}

export const deletePurchases = async (ids: string[]) => {
  const response = await purchasesApi.delete(purchasesApiEndpoint, { data: { ids } });
  return response.data;
}