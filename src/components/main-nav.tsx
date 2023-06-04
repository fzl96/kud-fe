import * as React from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import { SidebarNavItem } from "@/types";
import { Icons } from "@/components/icons";
import { MobileNav } from "./mobile-nav";
import { useLocation } from "react-router-dom";

interface MainNavProps {
  items?: SidebarNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const location = useLocation();

  React.useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

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
