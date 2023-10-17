import { getMembers, membersApiEndpoint } from "@/lib/api/members";
import useSWR from "swr";

export const useMembers = (token: string) => {
  const {
    data: members,
    error,
    mutate,
    isLoading,
  } = useSWR(membersApiEndpoint, () => getMembers(token), {
    onSuccess: (data) => {
      data.data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    },
  });
  return {
    members,
    loading: isLoading,
    error,
    mutate,
  };
};
