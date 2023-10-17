import { kudApi } from "./calls";
import type { Supplier } from "@/types";

export const suppliersApiEndpoint = "/suppliers";

type SupplierInput = {
  name: string;
  address?: string;
  phone?: string;
};

export const getSuppliers = async (token: string) => {
  const response = await kudApi.get(suppliersApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const suppliers: {
    pagination: any,
    data: Supplier[]
  } = response.data;
  return suppliers;
};

export const getSupplier = async (id: string) => {
  const response = await kudApi.get(`${suppliersApiEndpoint}/${id}`);
  const supplier: Supplier = response.data;
  return supplier;
};

export const createSupplier = async (supplier: SupplierInput) => {
  const response = await kudApi.post(suppliersApiEndpoint, supplier);
  return response.data;
};

export const updateSupplier = async (id: string, supplier: SupplierInput) => {
  const response = await kudApi.put(`${suppliersApiEndpoint}/${id}`, supplier);
  return response.data;
};

export const deleteSupplier = async (id: string) => {
  const response = await kudApi.delete(`${suppliersApiEndpoint}/${id}`);
  return response.data;
};

export const deleteSuppliers = async (ids: string[]) => {
  const response = await kudApi.delete(suppliersApiEndpoint, { data: { ids } });
  return response.data;
};
