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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProduct } from "@/lib/api/products";
import { useProducts } from "@/hooks/use-products";
import { useAuth } from "@/context/auth-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

const schema = z.object({
  name: z.string().min(2).max(255).nonempty(),
  price: z.number().min(0).max(1000000000),
  stock: z.number().min(0).max(10000000),
  categoryId: z.string().cuid().nonempty(),
  barcode: z.string().min(2).max(255).optional(),
});

export default function NewProducts() {
  const { auth } = useAuth();
  const { categories } = useProducts(auth.accessToken);

  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      categoryId: "",
      barcode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await createProduct(values);
      form.reset();
      toast({
        title: "Berhasil",
        description: "Barang berhasil ditambahkan",
      });
      return navigate("/barang");
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
        title="Barang Baru"
        description="Masukkan data barang baru"
        titleClass="font-semibold text-xl"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nama Barang</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama" />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Kategori</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[400px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? categories?.find(
                                  (category) => category.id === field.value
                                )?.name
                              : "Pilih Kategori"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <Command className="">
                          <CommandInput placeholder="Cari Kategori..." />
                          <CommandEmpty>Kategori tidak ditemukan.</CommandEmpty>
                          <CommandGroup>
                            {categories?.map((category) => (
                              <CommandItem
                                value={category.id}
                                key={category.id}
                                onSelect={(value) => {
                                  form.setValue("categoryId", value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    category.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {category.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {/* <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori">
                            {
                              categories?.find(
                                (category) => category.id === field.value
                              )?.name
                            }
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Kategori</SelectLabel>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="barcode"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Barcode Barang</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Kode Barcode" />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Harga</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Stok</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Simpan</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
