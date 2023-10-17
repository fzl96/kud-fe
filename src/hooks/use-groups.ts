import { getGroups, groupsApiEndpoint } from "@/lib/api/groups";
import useSWR from "swr";

export const useGroups = (token: string) => {
  const { data, error, mutate, isLoading } = useSWR(
    [groupsApiEndpoint, token],
    getGroups,
    {
      onSuccess: (data) => {
        data.data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      },
    }
  );

  return {
    groups: data,
    loading: isLoading,
    error,
    mutate,
  };
};
