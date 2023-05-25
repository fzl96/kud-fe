import { kudApi } from "./calls";
import { Category } from "@/types";

export const categoriesApiEndpoint = "/categories";

type CategoryInput = {
  name: string;
};

export const getCategories = async (token: string) => {
  const response = await kudApi.get(categoriesApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const categories: Category[] = response.data;
  return categories;
};

export const getCategory = async (id: string) => {
  const response = await kudApi.get(`${categoriesApiEndpoint}/${id}`);
  return response.data;
};

export const createCategory = async (category: CategoryInput) => {
  const response = await kudApi.post(categoriesApiEndpoint, category);
  return response.data;
};

export const updateCategory = async (id: string, category: CategoryInput) => {
  const response = await kudApi.put(`${categoriesApiEndpoint}/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await kudApi.delete(`${categoriesApiEndpoint}/${id}`);
  return response.data;
};

export const deleteCategories = async (ids: string[]) => {
  const response = await kudApi.delete(categoriesApiEndpoint, {
    data: { ids },
  });
  return response.data;
};
