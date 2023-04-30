import axios from 'axios'

const productsApi = axios.create({
  baseURL: 'http://localhost:3000',
})

export const productsApiEndpoint = '/products'

type Product = {
  name: string
  price: number
  categoryId: string
}

export const getProducts = async () => {
  const response = await productsApi.get(productsApiEndpoint)
  return response.data
}

export const getProduct = async (id: string) => {
  const response = await productsApi.get(`${productsApiEndpoint}/${id}`)
  return response.data
}

export const createProduct = async (product: Product) => {
  const response = await productsApi.post(productsApiEndpoint, product)
  return response.data
}

export const updateProduct = async (id: string, product: Product) => {
  const response = await productsApi.put(`${productsApiEndpoint}/${id}`, product)
  return response.data
}

export const deleteProduct = async (id: string) => {
  const response = await productsApi.delete(`${productsApiEndpoint}/${id}`)
  return response.data
}

export const deleteProducts = async (ids: string[]) => {
  const response = await productsApi.delete(productsApiEndpoint, { data: { ids } })
  return response.data
}