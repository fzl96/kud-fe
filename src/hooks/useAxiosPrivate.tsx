import { kudApi } from "../api/calls";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../context/authContext";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = kudApi.interceptors.request.use(
      (config) => {
        console.log("token valid = toked");
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = kudApi.interceptors.response.use(
      (response) => {
        console.log("is this fired 2");
        return response;
      },
      async (error) => {
        console.log("is this fired");
        const previousRequest = error.config;
        if (error.response.status === 401 && !previousRequest.sent) {
          previousRequest.sent = true;
          const newAccessToken = await refresh();
          previousRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return kudApi(previousRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      kudApi.interceptors.response.eject(responseIntercept);
      kudApi.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh]);

  return kudApi;
};

export default useAxiosPrivate;
