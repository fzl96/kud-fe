import { Card } from "@/components/card";
// import { PageTitle } from "@/components/page-title";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import {
  updateCategory,
  categoriesApiEndpoint,
  getCategory,
} from "@/lib/api/categories";
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
import { useEffect, useMemo } from "react";
import { Icons } from "@/components/icons";

const schema = z.object({
  name: z.string().min(2).max(255).nonempty(),
});

export default function CategoriesId() {
  const { id } = useParams();
  if (!id) {
    return null;
  }

  const {
    data: category,
    error,
    mutate,
    isLoading,
  } = useSWR(`${categoriesApiEndpoint}/${id}`, () => getCategory(id ?? ""));

  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: category?.name ?? "",
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
      });
    }
  }, [category]);

  const disabled = useMemo(() => {
    if (!form.formState.isDirty) {
      return true;
    }
  }, [form.formState.isDirty]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await updateCategory(id, values);
      form.reset();
      toast({
        title: "Berhasil",
        description: "Kategori berhasil diperbarui",
      });
      mutate();
      return navigate("/kategori");
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: "Gagal",
          description: error.response?.data.error,
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
      {/* <PageTitle heading="Kategori Baru" /> */}
      <Card
        title="Edit Kategori"
        description="Masukkan nama kategori baru"
        titleClass="font-semibold text-xl"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nama Kategori</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button disabled={disabled} type="submit">
              {form.formState.isSubmitting && (
                <span>
                  <Icons.spinner className="animate-spin h-4 w-4" />
                </span>
              )}
              Simpan
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
