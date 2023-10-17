import { getPurchases, purchasesApiEndpoint } from "@/lib/api/purchases";
import useSWR from "swr";

export const usePurchases = (token: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    [purchasesApiEndpoint, token],
    () => getPurchases(token),
    {
      onSuccess: (data) => {
        data.purchases.data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      },
    }
  );

  return {
    purchases: data?.purchases,
    suppliers: data?.suppliers,
    products: data?.products,
    loading: isLoading,
    error,
    mutate,
  };
};
