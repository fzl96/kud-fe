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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createGroup } from "@/lib/api/groups";
import { useMemo } from "react";
import { Icons } from "@/components/icons";

const schema = z.object({
  name: z.string().min(2).max(255).nonempty(),
  leaderId: z.string().optional(),
});

export default function NewGroup() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      leaderId: "",
    },
  });

  const disabled = useMemo(() => {
    return (
      form.formState.isSubmitting ||
      !form.formState.isDirty ||
      !form.formState.isValid
    );
  }, [
    form.formState.isSubmitting,
    form.formState.isDirty,
    form.formState.isValid,
  ]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await createGroup(values);
      form.reset();
      toast({
        title: "Berhasil",
        description: "Kelompok berhasil ditambahkan",
      });
      return navigate("/kelompok");
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
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nama Kelompok</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama" />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={disabled}>
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
