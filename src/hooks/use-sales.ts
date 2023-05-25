import { getSales, salesApiEndpoint } from "@/lib/api/sales";
import useSWR from "swr";

export const useSales = (token: string) => {
  const {
    data: sales,
    error,
    mutate,
    isLoading,
  } = useSWR([salesApiEndpoint, token], () => getSales(token), {
    onSuccess: (data) => {
      data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    },
  });
  return {
    sales,
    loading: isLoading,
    error,
    mutate,
  };
};
