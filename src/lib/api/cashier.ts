import { kudApi } from "./calls";

export const cashierApiEndpoint = "/cashier";

export type Sale = {
  customerId?: string;
  customerType: string;
  customerName?: string;
  products: {
    id: string;
    quantity: number;
  };
  cash?: number | undefined;
  change?: number | undefined;
  cashierId: string;
  paymentMethod?: string;
  status?: string;
  dueDate?: Date;
};

export const getCashier = async (token: string) => {
  const response = await kudApi.get(cashierApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postCashier = async (data: Sale) => {
  const response = await kudApi.post(cashierApiEndpoint, data);
  return response.data;
};
