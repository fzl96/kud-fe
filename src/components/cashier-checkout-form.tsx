import { useState, useMemo, useRef, useEffect } from "react";
// import Select from "react-select";
import { postCashier, type Sale } from "@/lib/api/cashier";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import Receipt from "./receipt";
// import ReactToPrint, { useReactToPrint } from "react-to-print";
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

const schema = z.object({
  customerId: z.string().optional(),
  paymentMethod: z.string().optional(),
  // cash: z.number().optional(),
});

interface Props {
  selectedItems: any;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  customers: any;
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

export default function CashierCheckoutForm({
  selectedItems,
  setSelectedItems,
  customers,
  mutate,
  auth,
}: Props) {
  // const pageStyle = `{ size: 2in 3in }`;
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();
  const [cash, setCash] = useState<number>(0);
  const [, setLoading] = useState(false);
  const componentRef = useRef<any>(null);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      customerId: "",
      paymentMethod: "TUNAI",
      // cash: 0,
    },
  });

  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  useEffect(() => {
    if (form.getValues().customerId === "") {
      // change payment method to tunai
      form.setValue("paymentMethod", "TUNAI");
    }
  }, [form.getValues().customerId, form.getValues().paymentMethod]);

  const options = useMemo(() => {
    return [
      {
        value: "",
        label: "Umum",
      },
      ...customers.map((customer: any) => ({
        value: customer.id,
        label: customer.name,
      })),
    ];
  }, [customers]);

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

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setLoading(true);
    const data: Sale = {
      customerId: values.customerId,
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
      console.log("test");
      await postCashier(data);
      // handlePrint();
      toast({
        title: "Berhasil",
        description: "Transaksi berhasil",
      });
      setLoading(false);
      form.reset({
        customerId: "",
        paymentMethod: "TUNAI",
      });
      setCash(0);
      setDate(undefined);
      setSelectedItems([]);
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

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  const tunai: boolean = useMemo(() => {
    return form.getValues().paymentMethod === "TUNAI";
  }, [form.getValues().paymentMethod]);

  // filter payment method, if customer is umum, then payment method is tunai
  const filteredPaymentMethod = useMemo(() => {
    return form.getValues().customerId === ""
      ? paymentMethod.filter((method) => method.value === "TUNAI")
      : paymentMethod;
  }, [form.getValues().customerId]);

  return (
    <div className="px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anggota/Umum</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Anggota">
                          {
                            options?.find(
                              (option) => option.value === field.value
                            )?.name
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Anggota</SelectLabel>
                          {options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
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
                            filteredPaymentMethod?.find(
                              (method) => method.value === field.value
                            )?.label
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Metode Pembayaran</SelectLabel>
                          {filteredPaymentMethod?.map((method) => (
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
              <FormItem>
                <FormLabel>Tenggat</FormLabel>
                <FormControl>
                  <DatePicker date={date} setDate={setDate} />
                </FormControl>
              </FormItem>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xl">
              <h1>Subtotal</h1>
              <span>{currencyFormatter.format(total)}</span>
            </div>

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
      {/* <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="customer" className="font-semibold">
              Anggota
            </label>
            <Select
              className="border-gray-300 border-2 block w-full sm:text-sm rounded-md"
              options={options}
              styles={customStyles}
              onChange={handleSelectChange}
              closeMenuOnSelect={true}
              noOptionsMessage={() => null}
              value={selectedCustomer}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Cash" className="font-semibold">
              Tunai
            </label>
            <input
              type="number"
              name="cash"
              value={cash}
              id="cash"
              placeholder="0"
              className="border-gray-300 py-2 px-3 border-2 block w-full rounded-md"
              onChange={(e) => setCash(parseInt(e.target.value))}
              onBlur={(e) =>
                e.target.value === ""
                  ? setCash(0)
                  : setCash(parseInt(e.target.value))
              }
            />
          </div>
          <div className="flex justify-between text-xl">
            <h1>Subtotal</h1>
            <span>{currencyFormatter.format(total)}</span>
          </div>

          <div className="flex justify-between font-semibold text-2xl">
            <h1>Total</h1>
            <span>{currencyFormatter.format(total)}</span>
          </div>
          <div className="flex justify-between text-xl">
            <h1>Tunai</h1>
            <span>{currencyFormatter.format(cash)}</span>
          </div>
          <div className="flex justify-between font-semibold text-2xl">
            <h1>Kembalian</h1>
            <span>{currencyFormatter.format(cash - total)}</span>
          </div>
          <button
            className={` ${
              disabled ? "bg-gray-500" : "bg-gray-800"
            } px-3 py-3 rounded-lg text-white`}
            disabled={disabled}
            type="submit"
          >
            Simpan
          </button>
        </div>
      </form> */}

      <div ref={componentRef} className="z-[-10] componentsToPrint">
        {/* {selectedItems && (
          <Receipt
            selectedItems={selectedItems}
            cash={cash || 0}
            change={cash - total || 0}
            totalPrice={total || 0}
          />
        )} */}
      </div>
    </div>
  );
}
