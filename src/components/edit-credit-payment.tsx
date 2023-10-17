import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMemo, useState } from "react";
import { updateCreditPayment } from "@/lib/api/credit-payment";
import { isAxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface EditCreditPaymentProps {
  payment: {
    id: string;
    amount: number;
    note?: string;
  };
  onSuccess: () => void;
}

const paymentSchema = z.object({
  amount: z.number().min(1).max(999999999).nonnegative(),
  note: z.string().max(255).optional(),
});

export function EditCreditPayment({
  payment,
  onSuccess,
}: EditCreditPaymentProps) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: payment.amount,
      note: payment.note,
    },
  });
  const [open, setOpen] = useState<boolean>(false);
  // disabled if form is submitting or form is not dirty
  const disabled = useMemo(
    () => form.formState.isSubmitting || !form.formState.isDirty,
    [form.formState.isSubmitting, form.formState.isDirty]
  );

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    try {
      await updateCreditPayment(payment.id, values);
      form.reset();
      toast({
        title: "Pembayaran berhasil diperbarui",
        variant: "success",
      });
      onSuccess();
      setOpen(false);
    } catch (err) {
      if (isAxiosError(err)) {
        toast({
          title: "Pembayaran gagal diperbarui",
          description: err.response?.data.error,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} size="sm">
          <Icons.edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Pembayaran</DialogTitle>
          <DialogDescription>
            Masukkan jumlah pembayaran yang akan dilakukan.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Pembayaran</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(event) =>
                        field.onChange(parseInt(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan</FormLabel>
                  <FormControl>
                    <Input placeholder="Tambah catatan (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                className="flex items-center gap-2"
                disabled={disabled}
              >
                {form.formState.isSubmitting && (
                  <Icons.spinner className="w-5 h-5 animate-spin" />
                )}
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
