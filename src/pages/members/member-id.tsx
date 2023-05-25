import { Card } from "@/components/card";
// import { PageTitle } from "@/components/page-title";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
import { useGroups } from "@/hooks/use-groups";
import {
  updateCustomer,
  getCustomer,
  customersApiEndpoint,
} from "@/lib/api/customers";
import useSWR from "swr";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(2).max(255).nonempty(),
  phone: z.string().max(255).optional(),
  groupId: z.string().optional(),
  status: z.string().optional(),
});

type MemberRole = {
  id: string;
  name: string;
};

const memberRoles: MemberRole[] = [
  {
    id: "KETUA",
    name: "Ketua",
  },
  {
    id: "ANGGOTA",
    name: "Anggota",
  },
];

export default function MemberId() {
  const { id } = useParams();
  const { auth } = useAuth();
  const { groups } = useGroups(auth.accessToken);
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    data: customer,
    error,
    isLoading,
    mutate,
  } = useSWR(`${customersApiEndpoint}/${id}`, () => getCustomer(id, false));
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: customer?.name ?? "",
      phone: customer?.phone ?? "",
      groupId: customer?.group.id ?? "",
      status: customer?.status ?? "",
    },
  });

  useEffect(() => {
    if (customer) {
      form.reset({
        name: customer.name,
        phone: customer.phone,
        groupId: customer.group.id,
        status: customer.status,
      });
    }
  }, [customer]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await updateCustomer(id, values);
      form.reset();
      toast({
        title: "Berhasil",
        description: "Anggota berhasil diupdate",
      });
      return navigate("/anggota");
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
        title="Edit Anggota"
        description="Masukkan data anggota baru"
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
                    <FormLabel>Nama Anggota</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama" />
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

              <FormField
                control={form.control}
                name="groupId"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Kelompok</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kelompok">
                            {
                              groups?.find((group) => group.id === field.value)
                                ?.name
                            }
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Kelompok</SelectLabel>
                            {groups?.map((group) => (
                              <SelectItem key={group.id} value={group.id}>
                                {group.name}
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
                name="status"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Status Keanggotaan</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status">
                            {
                              memberRoles?.find(
                                (memberRole) => memberRole.id === field.value
                              )?.name
                            }
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Kategori</SelectLabel>
                            {memberRoles?.map((memberRole) => (
                              <SelectItem
                                key={memberRole.id}
                                value={memberRole.id}
                              >
                                {memberRole.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
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
