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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateGroup, getGroup, groupsApiEndpoint } from "@/lib/api/groups";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().min(2).max(255).nonempty(),
  leaderId: z.string().optional(),
});

export default function GroupId() {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: group } = useSWR(`${groupsApiEndpoint}/${id}`, () =>
    getGroup(id)
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: group?.name ?? "",
      leaderId: group?.leader.id ?? "",
    },
  });

  useEffect(() => {
    if (group?.members) {
      form.reset({
        name: group.name,
        leaderId: group.leader.id,
      });
    }
  }, [group]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await updateGroup(id, values);
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
        title="Edit Kelompok"
        description="Masukkan data kelompok"
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
              {group?.members && group.members.length > 0 && (
                <FormField
                  control={form.control}
                  name="leaderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ketua Kelompok</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih ketua">
                              {
                                group.members?.find(
                                  (member) => member.id === field.value
                                )?.name
                              }
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Kategori</SelectLabel>
                              {group.members?.map((member) => (
                                <SelectItem key={member.id} value={member.id}>
                                  {member.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <Button type="submit">Simpan</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
