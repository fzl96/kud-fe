import { useState, useMemo, useRef, useEffect } from "react";
import { postCashier, type Sale } from "@/lib/api/cashier";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { DatePicker } from "@/components/ui/date-picker";
import { useReactToPrint } from "react-to-print";
import Receipt from "@/components/receipt";

const schema = z.object({
  memberId: z.string().optional(),
  customerName: z.string().optional(),
  customerType: z.string().nonempty(),
  paymentMethod: z.string().optional(),
  // cash: z.number().optional(),
});

interface Props {
  selectedItems: any;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  members: any;
  mutate: () => void;
  auth: any;
}

const paymentMethod = [
  {
    value: "TUNAI",
    label: "Tunai",
  },
  {
    value: "KREDIT",
    label: "Kredit",
  },
];

const customerTypes = [
  { label: "Umum", value: "UMUM" },
  { label: "Anggota", value: "ANGGOTA" },
];

export default function CashierCheckoutForm({
  selectedItems,
  setSelectedItems,
  members,
  mutate,
  auth,
}: Props) {
  const pageStyle = `{ size: 500mm 500mm }`;
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();
  const [cash, setCash] = useState<number>(0);
  const [, setLoading] = useState(false);
  const componentRef = useRef<any>(null);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      memberId: "",
      paymentMethod: "TUNAI",
      customerType: "UMUM",
      customerName: "",
      // cash: 0,
    },
  });

  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const membersOptions: {
    value: string;
    label: string;
  }[] = useMemo(() => {
    return members.map((member: any) => ({
      value: member.id,
      label: member.name,
    }));
  }, [members]);

  const total: number = useMemo(() => {
    return selectedItems.reduce((acc: any, item: any) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [selectedItems]);

  const disabled = useMemo(() => {
    return (
      (form.getValues().paymentMethod !== "KREDIT" &&
        (isNaN(cash) || cash < total)) ||
      selectedItems.length === 0
    );
  }, [selectedItems, cash, total]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@media print {
      @page {
        size: 80mm 200mm;
        margin: 0;
      }
    }`,
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setLoading(true);
    const data: Sale = {
      customerId: values.memberId,
      customerType: values.customerType,
      customerName: values.customerName,
      paymentMethod: values.paymentMethod,
      cash: cash ?? "",
      change: cash ? cash - total : undefined,
      products: selectedItems.map((item: any) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      cashierId: auth?.user?.id,
      dueDate: date,
      status: values.paymentMethod === "TUNAI" ? "SELESAI" : "PROSES",
    };

    try {
      await postCashier(data);
      toast({
        title: "Berhasil",
        description: "Transaksi berhasil",
      });
      setLoading(false);
      form.reset({
        memberId: "",
        paymentMethod: "TUNAI",
      });
      setCash(0);
      setDate(undefined);
      setSelectedItems([]);
      handlePrint();
      mutate();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast({
          title: "Berhasil",
          description: error.response?.data.error,
          variant: "destructive",
        });
        setLoading(false);
      }
    }
  };

  const tunai: boolean = useMemo(() => {
    return form.getValues().paymentMethod === "TUNAI";
  }, [form.getValues().paymentMethod]);

  return (
    <div className="px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="customerType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori Pelanggan (Anggota/Umum)</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Kategori Pelanggan">
                          {
                            customerTypes?.find(
                              (type) => type.value === field.value
                            )?.label
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Anggota</SelectLabel>
                          {customerTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            {form.getValues().customerType === "ANGGOTA" && (
              <>
                <FormField
                  control={form.control}
                  name="memberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anggota/Umum</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Anggota">
                              {
                                membersOptions?.find(
                                  (member) => member.value === field.value
                                )?.label
                              }
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Anggota</SelectLabel>
                              {membersOptions?.map((member) => (
                                <SelectItem
                                  key={member.value}
                                  value={member.value}
                                >
                                  {member.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
            {form.getValues().customerType === "UMUM" && (
              <>
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Pelanggan</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Masukkan nama pelanggan"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metode Pembayaran</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Anggota">
                          {
                            paymentMethod?.find(
                              (method) => method.value === field.value
                            )?.label
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Metode Pembayaran</SelectLabel>
                          {paymentMethod?.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            {tunai ? (
              <FormItem>
                <FormLabel>Tunai</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tunai"
                    type="number"
                    onChange={(event) => setCash(Number(event.target.value))}
                  />
                </FormControl>
              </FormItem>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-semibold text-2xl">
              <h1>Total</h1>
              <span>{currencyFormatter.format(total)}</span>
            </div>
            {tunai && (
              <>
                <div className="flex justify-between text-xl">
                  <h1>Tunai</h1>
                  <span>{currencyFormatter.format(cash)}</span>
                </div>
                <div className="flex justify-between font-semibold text-2xl">
                  <h1>Kembalian</h1>
                  <span>{currencyFormatter.format(cash - total)}</span>
                </div>
              </>
            )}
          </div>
          <Button className="w-full" type="submit" disabled={disabled}>
            Simpan
          </Button>
        </form>
      </Form>

      <div ref={componentRef} className="z-[-10] receipt">
        {selectedItems && (
          <Receipt
            selectedItems={selectedItems}
            cash={cash || 0}
            change={cash - total || 0}
            totalPrice={total || 0}
            paymentMethod={form.getValues().paymentMethod}
            customerName={
              form.getValues().customerType === "UMUM"
                ? form.getValues().customerName
                : membersOptions?.find(
                    (member) => member.value === form.getValues().memberId
                  )?.label || ""
            }
          />
        )}
      </div>
    </div>
  );
}
