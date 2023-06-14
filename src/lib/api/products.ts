import { kudApi } from "./calls";
import type { Product, ProductWithCategory } from "@/types";

export const productsApiEndpoint = "/products";

type ProductInput = {
  name: string;
  price: number;
  categoryId: string;
};

export const getProducts = async (token: string) => {
  const response = await kudApi.get(
    `${productsApiEndpoint}?include_categories=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const products: ProductWithCategory = response.data;
  return products;
};

export const getProduct = async (id: string) => {
  const response = await kudApi.get(`${productsApiEndpoint}/${id}`);
  const product: Product = response.data;
  return product;
};

export const createProduct = async (product: ProductInput) => {
  const response = await kudApi.post(productsApiEndpoint, product);
  return response.data;
};

export const updateProduct = async (id: string, product: ProductInput) => {
  const response = await kudApi.put(`${productsApiEndpoint}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await kudApi.delete(`${productsApiEndpoint}/${id}`);
  return response.data;
};

export const deleteProducts = async (ids: string[]) => {
  const response = await kudApi.delete(productsApiEndpoint, { data: { ids } });
  return response.data;
};

export const exportProducts = async (token: string) => {
  const response = await kudApi.get(`/export/products`, {
    responseType: "blob",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
