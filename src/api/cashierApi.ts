import { kudApi } from './calls';

export const cashierApiEndpoint = '/cashier';

export type Sale = {
  products: {
    id: string;
    quantity: number;
  };
  cash: number;
  change: number;
  customerId: string;
  cashierId: string;
};

export const getCashier = async (token: string) => {
  const response = await kudApi.get(cashierApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const postCashier = async (data: Sale) => {
  const response = await kudApi.post(cashierApiEndpoint, data);
  return response.data;
}