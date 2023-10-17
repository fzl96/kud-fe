import { Icons } from "@/components/icons";
import { UserAuthForm } from "@/components/user-auth-form";
import imgUrl from "@/assets/logo.webp";

const Login = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] border p-10 rounded-xl bg-white shadow-lg">
        <div className="flex flex-col space-y-2 text-center">
          <img src={imgUrl} alt="Logo" className="w-24 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Koperasi Unit Desa Jaya Makmur
          </h1>
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
