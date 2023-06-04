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
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { updateSale } from "@/lib/api/sales";
import { useToast } from "./ui/use-toast";
import { isAxiosError } from "axios";
import { useState } from "react";

const paymentSchema = z.object({
  amount: z.number().min(1).max(999999999).nonnegative(),
  note: z.string().max(255).optional(),
});

interface CreditPaymentProps {
  id: string;
  mutate: () => void;
  disabled: boolean;
}

export function CreditPayment({ id, mutate, disabled }: CreditPaymentProps) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: 0,
      note: "",
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    try {
      await updateSale(id, values);
      form.reset();
      toast({
        title: "Pembayaran berhasil ditambahkan",
        variant: "success",
      });
      mutate();
      setOpen(false);
    } catch (err) {
      if (isAxiosError(err)) {
        toast({
          title: "Pembayaran gagal ditambahkan",
          description: err.response?.data.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} disabled={disabled}>
          Tambah Pembayaran
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Pembayaran</DialogTitle>
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
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
