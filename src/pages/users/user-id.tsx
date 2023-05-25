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
import { updateUser } from "@/lib/api/users";
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
import { useUsersRoles } from "@/hooks/use-users-roles";
import useSWR from "swr";
import { getUser, usersApiEndpoint } from "@/lib/api/users";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2).max(255).nonempty(),
  username: z.string().max(255).nonempty(),
  newPassword: z.string().max(255).optional(),
  confirmPassword: z.string().max(255).optional(),
  currentPassword: z.string().max(255).optional(),
  roleId: z.string().cuid().nonempty(),
});

export default function NewUsers() {
  const { id } = useParams();
  const { auth } = useAuth();
  const { roles } = useUsersRoles(auth.accessToken);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR(`${usersApiEndpoint}/${id}`, () => getUser(id));

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
      roleId: user?.role.id || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        username: user.username,
        newPassword: "",
        confirmPassword: "",
        currentPassword: "",
        roleId: user.role.id,
      });
    }
  }, [user]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (changePassword && !values.newPassword) {
      toast({
        title: "Gagal",
        description: "Password baru tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }
    if (values.newPassword !== values.confirmPassword) {
      toast({
        title: "Gagal",
        description: "Password baru tidak sama",
        variant: "destructive",
      });
      return;
    }
    try {
      await updateUser(id, {
        name: values.name,
        username: values.username,
        newPassword: changePassword ? values.newPassword : "",
        confirmPassword: changePassword ? values.confirmPassword : "",
        currentPassword: changePassword ? values.currentPassword : "",
        roleId: values.roleId,
      });
      form.reset();
      toast({
        title: "Berhasil",
        description: "Pengguna berhasil ditambahkan",
      });
      return navigate("/pengguna");
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
        title="Edit Pengguna"
        description="Masukkan data pengguna baru"
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
                    <FormLabel>Nama Pengguna</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nama" />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Username" />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roleId"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih role">
                            {
                              roles?.find((role) => role.id === field.value)
                                ?.name
                            }
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Kategori</SelectLabel>
                            {roles?.map((role) => (
                              <SelectItem key={role.id} value={role.id}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <br />
              <div className="flex items-center space-x-2">
                <Switch
                  id="change-password"
                  checked={changePassword}
                  onCheckedChange={setChangePassword}
                />
                <Label htmlFor="change-password">Ganti Password</Label>
              </div>
              {changePassword && (
                <>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Password Baru</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="**********"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password Baru</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="**********"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Password Lama</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="**********"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <Button type="submit">Simpan</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
