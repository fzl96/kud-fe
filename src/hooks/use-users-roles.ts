import useSWR from "swr";
import { getUsers, usersApiEndpoint } from "@/lib/api/users";

export const useUsersRoles = (token: string) => {
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR([usersApiEndpoint, token], () => getUsers(token), {
    onSuccess: (data) => {
      data.users.data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    },
  });

  return {
    users: data?.users,
    roles: data?.roles,
    error,
    mutate,
    loading,
  };
};
