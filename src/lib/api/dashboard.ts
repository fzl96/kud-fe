import { kudApi } from "./calls";
import type { DashboardData } from "@/types/";

export const dashboardApiEndpoint = "/dashboard";

export const getDashboard = async (year: number, token: string) => {
  const response = await kudApi.get(`${dashboardApiEndpoint}/${year}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: DashboardData = response.data;
  return data;
};
