import axios from 'axios';
import { kudApi } from './calls';

export const categoriesApiEndpoint = '/categories';

type Category = {
  name: string;
};

export const getCategories = async (token: string) => {
  const response = await kudApi.get(categoriesApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCategory = async (id: string) => {
  const response = await kudApi.get(`${categoriesApiEndpoint}/${id}`);
  return response.data;
};

export const createCategory = async (category: Category) => {
  const response = await kudApi.post(categoriesApiEndpoint, category);
  return response.data;
}

export const updateCategory = async (id: string, category: Category) => {
  const response = await kudApi.put(`${categoriesApiEndpoint}/${id}`, category);
  return response.data;
}

export const deleteCategory = async (id: string) => {
  const response = await kudApi.delete(`${categoriesApiEndpoint}/${id}`);
  return response.data;
}

export const deleteCategories = async (ids: string[]) => {
  const response = await kudApi.delete(categoriesApiEndpoint, { data: { ids } });
  return response.data;
}