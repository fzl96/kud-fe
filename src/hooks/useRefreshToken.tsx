import axios from "axios";
import { useAuth } from "../context/authContext";
import jwt_decode from "jwt-decode";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    const response = await axios.get("http://localhost:3000/auth/token", {
      withCredentials: true,
    });
    setAuth({
      accessToken: response.data.accessToken,
      user: jwt_decode(response.data.accessToken),
    });
    return response.data.accessToken;
  };

  return refreshToken;
};

export default useRefreshToken;
