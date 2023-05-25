import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { getToken } from "@/lib/api/auth";
import jwt_decode from "jwt-decode";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { useState } from "react";
// import { ClipLoader } from "react-spinners";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const refreshToken = async () => {
    setLoading(true);
    try {
      const response = await getToken();
      setAuth({
        accessToken: response.accessToken,
        user: jwt_decode(response.accessToken),
      });
      setLoading(false);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  // useEffect(() => {
  //   if (auth?.user && auth?.user.role.name === "Kasir") {
  //     return navigate("/kasir");
  //   }

  //   if (auth?.user && auth?.user.role.name === "Admin") {
  //     return navigate("/kategori");
  //   }

  //   if (auth?.user && auth?.user.role.name === "Ketua") {
  //     return navigate("/");
  //   }

  //   if (auth?.user && auth?.user.role.name === "Bendahara") {
  //     return navigate("/");
  //   }
  // }, [auth]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          {/* <ClipLoader color="#1a1a1a" size={50} /> */}
        </div>
      </div>
    );
  }

  if (!auth) {
    return null;
  }

  return auth?.user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
