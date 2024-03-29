import * as React from "react";
import { Link } from "react-router-dom";
import { SidebarNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { useLockBody } from "@/hooks/use-lock-body";
import imgUrl from "@/assets/logo.webp";

interface MobileNavProps {
  items: SidebarNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 lg:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link to="/" className="flex items-center space-x-2">
          <img src={imgUrl} alt="Logo" className="w-7" />
          <span className="font-bold">KUD Jaya Makmur</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  to={item.href}
                  className={cn(
                    "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                    item.disabled && "cursor-not-allowed opacity-60"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
        {children}
      </div>
    </div>
  );
}
