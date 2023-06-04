import useSWR from "swr";
import { salesApiEndpoint, getSale } from "@/lib/api/sales";

export const useSale = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${salesApiEndpoint}/${id}`,
    () => getSale(id)
  );

  return {
    sale: data,
    isLoading: isLoading,
    error,
    mutate,
  };
};
