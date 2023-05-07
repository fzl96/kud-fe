import { kudApi } from "./calls";

export const productsApiEndpoint = '/products'

type Product = {
  name: string
  price: number
  categoryId: string
}

export const getProducts = async (token: string) => {
  const response = await kudApi.get(`${productsApiEndpoint}?include_categories=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getProduct = async (id: string) => {
  const response = await kudApi.get(`${productsApiEndpoint}/${id}`)
  return response.data
}

export const createProduct = async (product: Product) => {
  const response = await kudApi.post(productsApiEndpoint, product)
  return response.data
}

export const updateProduct = async (id: string, product: Product) => {
  const response = await kudApi.put(`${productsApiEndpoint}/${id}`, product)
  return response.data
}

export const deleteProduct = async (id: string) => {
  const response = await kudApi.delete(`${productsApiEndpoint}/${id}`)
  return response.data
}

export const deleteProducts = async (ids: string[]) => {
  const response = await kudApi.delete(productsApiEndpoint, { data: { ids } })
  return response.data
}