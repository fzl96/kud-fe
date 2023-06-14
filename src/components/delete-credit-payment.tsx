import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { deleteCreditPayment } from "@/lib/api/credit-payment";
import { Icons } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeleteCreditPaymentProps {
  id: string;
  onSuccess: () => void;
}

export function DeleteCreditPayment({
  id,
  onSuccess,
}: DeleteCreditPaymentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log("test");

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger>
        <Button
          variant="destructive"
          className="bg-red-500 hover:bg-red-600 focus:ring-red-600"
          size="sm"
        >
          <Icons.delete className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Pembayaran Kredit</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Apakah Anda yakin ingin menghapus pembayaran kredit ini?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 focus:ring-red-600"
            onClick={async () => {
              setIsLoading(true);
              await deleteCreditPayment(id);
              setIsLoading(false);
              setIsAlertOpen(false);
              onSuccess();
            }}
            disabled={isLoading}
          >
            {isLoading && (
              <span>
                <Icons.spinner className="w-4 h-4" />
              </span>
            )}
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
