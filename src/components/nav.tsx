import { Link, NavLink } from "react-router-dom";
import { SidebarNavItem } from "@/types";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useMatch } from "react-router-dom";

interface SidebarNavProps {
  items: SidebarNavItem[];
}

export function SidebarNav({ items }: SidebarNavProps) {
  // const path = usePathname();

  if (!items) return null;

  const mainSection = items.filter((item) => item.section === "main");
  const goodsSection = items.filter((item) => item.section === "goods");
  const transactionSection = items.filter(
    (item) => item.section === "transaction"
  );
  const memberSection = items.filter((item) => item.section === "member");
  const userSection = items.filter((item) => item.section === "user");

  return (
    <nav className="grid items-start gap-2 ">
      <div className="flex flex-col gap-2 ">
        {mainSection.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            item.href && (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive, isPending }) =>
                  cn(
                    "group flex items-center rounded-md px-3 py-2 font-semibold hover:bg-accent_3 hover:text-accent_3-foreground",
                    isActive
                      ? "bg-accent_3 text-accent_3-foreground"
                      : "transparent"
                  )
                }
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            )
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="ml-3 uppercase text-sm my-2 font-semibold text-slate-400">
          Barang
        </h1>

        {goodsSection.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            item.href && (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive, isPending }) =>
                  cn(
                    "group flex items-center rounded-md px-3 py-2 font-semibold ver:bg-accent_3 hover:bg-accent_3 hover:text-accent_3-foreground",
                    isActive
                      ? "bg-accent_3 text-accent_3-foreground"
                      : "transparent"
                  )
                }
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            )
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="ml-3 uppercase text-sm my-2 font-semibold text-slate-400">
          Transaksi
        </h1>
        {transactionSection.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            item.href && (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive, isPending }) =>
                  cn(
                    "group flex items-center rounded-md px-3 py-2 font-semibold hover:bg-accent_3 hover:text-accent_3-foreground",
                    isActive
                      ? "bg-accent_3 text-accent_3-foreground"
                      : "transparent"
                  )
                }
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            )
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="ml-3 uppercase text-sm my-2 font-semibold text-slate-400">
          Keanggotaan
        </h1>
        {memberSection.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            item.href && (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive, isPending }) =>
                  cn(
                    "group flex items-center rounded-md px-3 py-2 font-semibold hover:bg-accent_3 hover:text-accent_3-foreground",
                    isActive
                      ? "bg-accent_3 text-accent_3-foreground"
                      : "transparent"
                  )
                }
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            )
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="ml-3 uppercase text-sm my-2 font-semibold text-slate-400">
          User
        </h1>
        {userSection.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          return (
            item.href && (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive, isPending }) =>
                  cn(
                    "group flex items-center rounded-md px-3 py-2 font-semibold hover:bg-accent_3 hover:text-accent_3-foreground",
                    isActive
                      ? "bg-accent_3 text-accent_3-foreground"
                      : "transparent"
                  )
                }
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </NavLink>
            )
          );
        })}
      </div>
    </nav>
  );
}
