import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "./context/authContext";
import { kudApi } from "./api/calls";
import useRefreshToken from "./hooks/useRefreshToken";

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Layout({ children, open, setOpen }: Props) {
  return (
    <div className="flex min-h-[100svh]">
      <div className="bg-gray-400 fixed top-0 w-full h-10 lg:hidden text-right">
        <button className="mr-5 text-2xl" onClick={() => setOpen(!open)}>
          =
        </button>
      </div>
      <Sidebar open={open} setOpen={setOpen} />
      <div
        className={`mt-10 lg:mt-5 w-full lg:ml-[15.5rem] ml-0 bg-[#f8f9fa] text-[#16161a]`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Root() {
  const [open, setOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = kudApi.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = kudApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const previousRequest = error.config;
        if (error.response.status === 403 && !previousRequest.sent) {
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

  return (
    <AnimatePresence>
      <Layout open={open} setOpen={setOpen}>
        <Outlet />
      </Layout>
    </AnimatePresence>
  );
}
