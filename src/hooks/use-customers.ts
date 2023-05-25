import { getCustomers, customersApiEndpoint } from "@/lib/api/customers";
import useSWR from "swr";

export const useCustomers = (token: string) => {
  const {
    data: members,
    error,
    mutate,
    isLoading,
  } = useSWR(customersApiEndpoint, () => getCustomers(token), {
    onSuccess: (data) => {
      data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    },
  });
  return {
    members,
    loading: isLoading,
    error,
    mutate,
  };
};
