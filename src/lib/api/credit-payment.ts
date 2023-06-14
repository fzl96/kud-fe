import { kudApi } from "./calls";

export const creditPaymentApiEndpoint = "/credit-payment";

type CreditPaymentInput = {
  amount: number;
  note?: string;
  saleId?: string;
};

export const getCreditPayments = async (token: string) => {
  const response = await kudApi.get(creditPaymentApiEndpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getCreditPayment = async (id: string) => {
  const response = await kudApi.get(`${creditPaymentApiEndpoint}/${id}`);
  return response.data;
};

export const createCreditPayment = async (
  creditPayment: CreditPaymentInput
) => {
  const response = await kudApi.post(creditPaymentApiEndpoint, creditPayment);
  return response.data;
};

export const updateCreditPayment = async (
  id: string,
  creditPayment: CreditPaymentInput
) => {
  const response = await kudApi.put(
    `${creditPaymentApiEndpoint}/${id}`,
    creditPayment
  );
  return response.data;
};

export const deleteCreditPayment = async (id: string) => {
  const response = await kudApi.delete(`${creditPaymentApiEndpoint}/${id}`);
  return response.data;
};
