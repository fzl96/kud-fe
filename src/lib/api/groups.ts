import { kudApi } from "./calls";
import { Group } from "@/types";

export const groupsApiEndpoint = "/groups";

interface GroupInput {
  name: string;
  members?: string[];
  leaderId?: string;
}

export const getGroups = async (token: string) => {
  const response = await kudApi.get(groupsApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const groups: {
    pagination: any,
    data: Group[]
  } = response.data;
  return groups;
};

export const getGroup = async (
  id: string,
  include_sales: boolean,
  year?: number,
  month?: number
) => {
  let endPoint = `${groupsApiEndpoint}/${id}`;
  if (include_sales) {
    endPoint += `?include_sales=${include_sales}&year=${year}&month=${month}`;
  } else {
    endPoint += `?include_sales=${include_sales}`;
  }
  const response = await kudApi.get(endPoint);
  const group: Group = response.data;
  return group;
};

export const createGroup = async (group: GroupInput) => {
  const response = await kudApi.post(groupsApiEndpoint, group);
  return response.data;
};

export const updateGroup = async (id: string, group: GroupInput) => {
  const response = await kudApi.put(`${groupsApiEndpoint}/${id}`, group);
  return response.data;
};

export const deleteGroup = async (id: string) => {
  const response = await kudApi.delete(`${groupsApiEndpoint}/${id}`);
  return response.data;
};

export const deleteGroups = async (ids: string[]) => {
  const response = await kudApi.delete(groupsApiEndpoint, { data: { ids } });
  return response.data;
};
