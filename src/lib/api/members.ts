import { kudApi } from "./calls";
import { Member } from "@/types";

export const membersApiEndpoint = "/members";

type CustomerInput = {
  name: string;
  phone?: string;
  groupId?: string;
  status?: string;
};

export const getMembers = async (token: string) => {
  const response = await kudApi.get(membersApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const customers: Member[] = response.data;
  return customers;
};

export const getMember = async (
  id: string,
  withSales: boolean,
  year?: number,
  month?: number
) => {
  let endPoint = `${membersApiEndpoint}/${id}`;
  if (withSales) {
    endPoint += `?include_sales=${withSales}&year=${year}&month=${month}`;
  } else {
    endPoint += `?include_sales=${withSales}`;
  }
  const response = await kudApi.get(endPoint);
  const customer: Member = response.data;
  return customer;
};

export const createMember = async (customer: CustomerInput) => {
  const response = await kudApi.post(membersApiEndpoint, customer);
  return response.data;
};

export const updateMember = async (id: string, customer: CustomerInput) => {
  const response = await kudApi.put(`${membersApiEndpoint}/${id}`, customer);
  return response.data;
};

export const deleteMember = async (id: string) => {
  const response = await kudApi.delete(`${membersApiEndpoint}/${id}`);
  return response.data;
};

export const deleteMembers = async (ids: string[]) => {
  const response = await kudApi.delete(membersApiEndpoint, { data: { ids } });
  return response.data;
};
