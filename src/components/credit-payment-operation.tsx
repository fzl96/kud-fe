import { EditCreditPayment } from "@/components/edit-credit-payment";
import { DeleteCreditPayment } from "@/components/delete-credit-payment";

interface CreditPaymentOperationProps {
  payment: {
    id: string;
    amount: number;
    note?: string;
  };
  onSuccess: () => void;
}

export function CreditPaymentOperation({
  payment,
  onSuccess,
}: CreditPaymentOperationProps) {
  return (
    <div className="flex space-x-2">
      <EditCreditPayment payment={payment} onSuccess={onSuccess} />
      <DeleteCreditPayment id={payment.id} onSuccess={onSuccess} />
    </div>
  );
}
