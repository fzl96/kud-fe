import axios from "axios";

const dashboardApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const dashboardApiEndpoint = "/dashboard";

export const getDashboard = async (year: number) => {
  const response = await dashboardApi.get(`${dashboardApiEndpoint}/${year}`);
  return response.data;
}