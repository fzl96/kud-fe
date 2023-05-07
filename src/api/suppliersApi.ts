import { kudApi } from "./calls"

export const suppliersApiEndpoint = '/suppliers'

type Supplier = {
  name: string
  address?: string
  phone?: string
}

export const getSuppliers = async (token: string) => {
  const response = await kudApi.get(suppliersApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getSupplier = async (id: string) => {
  const response = await kudApi.get(`${suppliersApiEndpoint}/${id}`)
  return response.data
}

export const createSupplier = async (supplier: Supplier) => {
  const response = await kudApi.post(suppliersApiEndpoint, supplier)
  return response.data
}

export const updateSupplier = async (id: string, supplier: Supplier) => {
  const response = await kudApi.put(`${suppliersApiEndpoint}/${id}`, supplier)
  return response.data
}

export const deleteSupplier = async (id: string) => {
  const response = await kudApi.delete(`${suppliersApiEndpoint}/${id}`)
  return response.data
}

export const deleteSuppliers = async (ids: string[]) => {
  const response = await kudApi.delete(suppliersApiEndpoint, { data: { ids } })
  return response.data
}

