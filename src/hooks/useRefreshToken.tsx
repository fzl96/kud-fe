import axios from "axios";
import { useAuth } from "../context/authContext";
import jwt_decode from "jwt-decode";
import { getToken } from "../api/auth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    const response = await getToken();
    console.log("test: ", response);
    setAuth({
      accessToken: response.accessToken,
      user: jwt_decode(response.accessToken),
    });
    return response.data.accessToken;
  };

  return refreshToken;
};

export default useRefreshToken;
