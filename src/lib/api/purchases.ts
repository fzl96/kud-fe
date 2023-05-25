import { kudApi } from "./calls";
import { Purchase, PurchaseWithSupplierProduct } from "@/types";

export const purchasesApiEndpoint = "/purchases";

type Item = {
  id: string;
  purchasePrice: number;
  quantity: number;
};

type PurchaseInput = {
  supplierId: string;
  items: Item[];
};

export const getPurchases = async (
  token: string,
  includeProductsSupplier: boolean
) => {
  const response = await kudApi.get(
    `${purchasesApiEndpoint}?include_products_suppliers=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const purchases: PurchaseWithSupplierProduct = response.data;
  return purchases;
};

export const getPurchase = async (id: string) => {
  const response = await kudApi.get(`${purchasesApiEndpoint}/${id}`);
  const purchase: Purchase = response.data;
  return purchase;
};

export const createPurchase = async (purchase: PurchaseInput) => {
  const response = await kudApi.post(purchasesApiEndpoint, purchase);
  return response.data;
};

export const updatePurchase = async (id: string, purchase: PurchaseInput) => {
  const response = await kudApi.put(`${purchasesApiEndpoint}/${id}`, purchase);
  return response.data;
};

export const deletePurchase = async (id: string) => {
  const response = await kudApi.delete(`${purchasesApiEndpoint}/${id}`);
  return response.data;
};

export const deletePurchases = async (ids: string[]) => {
  const response = await kudApi.delete(purchasesApiEndpoint, { data: { ids } });
  return response.data;
};
