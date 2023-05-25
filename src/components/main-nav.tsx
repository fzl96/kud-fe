"use client";

import * as React from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import { SidebarNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { MobileNav } from "./mobile-nav";

interface MainNavProps {
  items?: SidebarNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="hidden items-center space-x-2 lg:flex">
        <Icons.logo />
        <span className="hidden font-bold sm:inline-block">Jayamakmur</span>
      </Link>
      <button
        className="flex items-center space-x-2 lg:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}