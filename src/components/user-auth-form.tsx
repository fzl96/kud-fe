import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { login } from "@/lib/api/auth";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import jwt_decode from "jwt-decode";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState("");

  const getFirstPage = (roleName: string) => {
    switch (roleName) {
      case "Admin":
        return "/";
      case "Ketua":
        return "/";
      case "Kasir":
        return "/kasir";
      case "Bendahara":
        return "/";
      default:
        return "/";
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      const user: any = jwt_decode(response.accessToken);
      setAuth({
        accessToken: response.accessToken,
        user: user,
      });

      const firstPage = getFirstPage(user.role.name);
      setIsLoading(false);
      navigate(firstPage);
    } catch (err) {
      if (isAxiosError(err) && err.response) {
        setError(err.response.data.error);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("username")}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
          </div>
          <button className={cn(buttonVariants(), "py-4")} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
