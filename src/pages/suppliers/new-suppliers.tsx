import { Card } from "@/components/card";
// import { PageTitle } from "@/components/page-title";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createSupplier } from "@/lib/api/suppliers";

const schema = z.object({
  name: z.string().min(2).max(255).nonempty(),
  address: z.string().max(255).optional(),
  phone: z.string().max(255).optional(),
});

export default function NewSuppliers() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await createSupplier(values);
      form.reset();
      toast({
        title: "Berhasil",
        description: "Supplier berhasil ditambahkan",
      });
      return navigate("/supplier");
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
        title="Supplier Baru"
        description="Masukkan data supplier baru"
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
                    <FormLabel>Nama Supplier</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama" />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Alamat Supplier</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Alamat" />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>No. Telepon</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="No. Telepon" />
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
