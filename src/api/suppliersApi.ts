import axios from 'axios'

const suppliersApi = axios.create({
  baseURL: 'http://localhost:3000',
})

export const suppliersApiEndpoint = '/suppliers'

type Supplier = {
  name: string
  address?: string
  phone?: string
}

export const getSuppliers = async () => {
  const response = await suppliersApi.get(suppliersApiEndpoint)
  return response.data
}

export const getSupplier = async (id: string) => {
  const response = await suppliersApi.get(`${suppliersApiEndpoint}/${id}`)
  return response.data
}

export const createSupplier = async (supplier: Supplier) => {
  const response = await suppliersApi.post(suppliersApiEndpoint, supplier)
  return response.data
}

export const updateSupplier = async (id: string, supplier: Supplier) => {
  const response = await suppliersApi.put(`${suppliersApiEndpoint}/${id}`, supplier)
  return response.data
}

export const deleteSupplier = async (id: string) => {
  const response = await suppliersApi.delete(`${suppliersApiEndpoint}/${id}`)
  return response.data
}

export const deleteSuppliers = async (ids: string[]) => {
  const response = await suppliersApi.delete(suppliersApiEndpoint, { data: { ids } })
  return response.data
}

