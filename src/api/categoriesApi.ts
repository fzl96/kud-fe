import axios from 'axios';

const categoriesApi = axios.create({
  baseURL: 'http://localhost:3000',
});

export const categoriesApiEndpoint = '/categories';

type Category = {
  name: string;
};

export const getCategories = async () => {
  const response = await categoriesApi.get(categoriesApiEndpoint);
  return response.data;
};

export const getCategory = async (id: string) => {
  const response = await categoriesApi.get(`${categoriesApiEndpoint}/${id}`);
  return response.data;
};

export const createCategory = async (category: Category) => {
  const response = await categoriesApi.post(categoriesApiEndpoint, category);
  return response.data;
}

export const updateCategory = async (id: string, category: Category) => {
  const response = await categoriesApi.put(`${categoriesApiEndpoint}/${id}`, category);
  return response.data;
}

export const deleteCategory = async (id: string) => {
  const response = await categoriesApi.delete(`${categoriesApiEndpoint}/${id}`);
  return response.data;
}

export const deleteCategories = async (ids: string[]) => {
  const response = await categoriesApi.delete(categoriesApiEndpoint, { data: { ids } });
  return response.data;
}