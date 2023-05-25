import axios from "axios";
import { kudApi } from "./calls";

export const dashboardApiEndpoint = "/dashboard";

export const getDashboard = async (year: number, token: string) => {
  const response = await kudApi.get(`${dashboardApiEndpoint}/${year}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
