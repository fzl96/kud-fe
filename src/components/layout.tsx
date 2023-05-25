import { Outlet } from "react-router-dom";
import { MainNav } from "./main-nav";
import { dashboardConfig } from "@/config/dashboard";
import { UserAccountNav } from "./user-account-nav";
import { SidebarNav } from "@/components/nav";
import { useAuth } from "@/context/auth-context";
import useRefreshToken from "@/hooks/use-refresh-token";
import { useEffect } from "react";
import { kudApi } from "@/lib/api/calls";

export function Layout() {
  const { auth } = useAuth();
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

  return (
    <div className="flex min-h-screen flex-col font-sans space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.sidebarNav} />
          <UserAccountNav
            user={{
              name: auth.user.name,
              image: "https://i.pravatar.cc/100?img=68",
              username: auth.user.username,
            }}
          />
        </div>
      </header>
      <div className="container">
        <aside className="hidden w-[200px] flex-col lg:flex fixed bg-white">
          <SidebarNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full lg:pl-[250px] flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}