import useSWR from "swr";
import { getProducts, productsApiEndpoint } from "@/lib/api/products";

export const useProducts = (token: string) => {
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR([productsApiEndpoint, token], () => getProducts(token), {
    onSuccess: (data) => {
      data.products.data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    },
  });

  return {
    products: data?.products,
    categories: data?.categories,
    error,
    mutate,
    loading,
  };
};
