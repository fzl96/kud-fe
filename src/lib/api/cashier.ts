import { kudApi } from "./calls";
import { CashierConfig } from "@/types";

export const cashierApiEndpoint = "/cashier";

export type Sale = {
  memberId?: string;
  products: {
    id: string;
    quantity: number;
  }[];
  cash?: number | undefined;
  change?: number | undefined;
  cashierId: string;
  customerType: string;
  customerName?: string;
  paymentMethod?: string;
};

export const getCashier = async (token: string) => {
  const response = await kudApi.get(cashierApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: CashierConfig = response.data;
  return data;
};

export const postCashier = async (data: Sale) => {
  const response = await kudApi.post(cashierApiEndpoint, data);
  return response.data;
};
