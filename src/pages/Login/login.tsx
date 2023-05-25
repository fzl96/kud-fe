import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";

const Login = () => {
  return (
    <div className="container flex bg-white h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Masukkan username dan password untuk login
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
};

export default Login;
