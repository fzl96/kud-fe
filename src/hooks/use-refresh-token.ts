import { useAuth } from "@/context/auth-context";
import jwt_decode from "jwt-decode";
import { getToken } from "@/lib/api/auth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    const response = await getToken();
    setAuth({
      accessToken: response.accessToken,
      user: jwt_decode(response.accessToken),
    });
    return response.data.accessToken;
  };

  return refreshToken;
};

export default useRefreshToken;
