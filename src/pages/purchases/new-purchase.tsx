import { Card } from "@/components/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createPurchase } from "@/lib/api/purchases";
import {
  Select as Single,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/auth-context";
import { usePurchases } from "@/hooks/use-purchases";
import Select from "react-select";
import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";

const schema = z.object({
  supplierId: z.string().min(2).max(255).nonempty(),
});

const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    padding: "0.2rem 0.3rem 0 0.3rem",
    borderRadius: ".3rem",
    borderWidth: "1px",
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  }),
  control: (provided: any) => ({
    ...provided,
    paddingLeft: "0.35rem",
    backgroundColor: "transparent",
    borderRadius: "0.375rem",
    border: "1px",
    borderColor: "hsl(214.3 31.8% 91.4%)",
    outline: "none",
    boxShadow: "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#d7dde4" : "white",
    fontSize: "0.8rem",
    borderRadius: "0.2rem",
    marginBottom: "0.1rem",
    color: "black",
    "&:hover": {
      backgroundColor: "#f1f5f9",
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#f1f5f9",
    borderRadius: "4px",
    padding: "0.1rem 0.3rem",
  }),
};

export default function NewPurchase() {
  const { auth } = useAuth();
  const { suppliers, products } = usePurchases(auth.accessToken);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const productOptions = useMemo(() => {
    return products?.map((product: any) => ({
      value: product.id,
      label: product.name,
      purchasePrice: 1,
      quantity: 1,
    }));
  }, [products]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      supplierId: "",
    },
  });

  const handleProductChange = (selectedOption: any) => {
    setSelectedProducts(selectedOption);
  };

  const handleQuantityChange = (event: any, productId: string) => {
    const updatedProducts = selectedProducts.map((product: any) => {
      if (product.value === productId) {
        return {
          ...product,
          quantity: parseInt(event.target.value),
          total: parseInt(event.target.value) * product.purchasePrice || 1,
        };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };

  const handlePurchasePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    const updatedProducts = selectedProducts.map((product: any) => {
      if (product.value === productId) {
        return {
          ...product,
          purchasePrice: parseInt(event.target.value),
          total: parseInt(event.target.value) * product.quantity || 1,
        };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const data = {
        supplierId: values.supplierId,
        items: selectedProducts.map((product: any) => ({
          id: product.value,
          purchasePrice: product.purchasePrice,
          quantity: product.quantity,
        })),
      };
      await createPurchase(data);
      form.reset();
      toast({
        title: "Berhasil",
        description: "Kelompok berhasil ditambahkan",
      });
      return navigate("/pembelian");
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: "Gagal",
          description: error.response?.data.error,
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Gagal",
        description: "Terjadi Kesalahan",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card
        title="Kelompok Baru"
        description="Masukkan nama kelompok"
        titleClass="font-semibold text-xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="supplierId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier</FormLabel>
                    <FormControl>
                      <Single {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Supplier">
                            {
                              suppliers?.find(
                                (supplier) => supplier.id === field.value
                              )?.name
                            }
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Supplier</SelectLabel>
                            {suppliers?.map((supplier) => (
                              <SelectItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Single>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Produk</FormLabel>
                <FormControl>
                  <Select
                    options={productOptions}
                    onChange={handleProductChange}
                    value={selectedProducts}
                    className="border border-input rounded-md ring-offset-background focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground"
                    styles={customStyles}
                    isMulti
                    closeMenuOnSelect={false}
                    menuPortalTarget={document.querySelector("body")}
                  />
                </FormControl>
              </FormItem>
              <br />
              <div className="space-y-4">
                {selectedProducts &&
                  selectedProducts.length > 0 &&
                  selectedProducts.map((product: any) => (
                    <div key={product.id} className="flex flex-col gap-3">
                      <Label>{product.label}</Label>
                      <div className="flex gap-5">
                        <div className="flex flex-col gap-1">
                          <Label className="text-sm font-normal">
                            Jumlah beli
                          </Label>
                          <Input
                            type="number"
                            placeholder="Jumlah Beli"
                            value={product.quantity}
                            onChange={(e) =>
                              handleQuantityChange(e, product.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col ">
                          <Label className="text-sm font-normal">
                            Harga Satuan
                          </Label>
                          <Input
                            type="number"
                            placeholder="Harga Satuan"
                            value={product.purchasePrice}
                            onChange={(e) =>
                              handlePurchasePriceChange(e, product.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <Button type="submit">Simpan</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
