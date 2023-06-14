import * as React from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import { SidebarNavItem } from "@/types";
import { Icons } from "@/components/icons";
import { MobileNav } from "./mobile-nav";
import { useLocation } from "react-router-dom";
import imgUrl from "@/assets/logo.webp";

interface MainNavProps {
  items?: SidebarNavItem[];
  children?: React.ReactNode;
  role: string;
}

export function MainNav({ items, children, role }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const location = useLocation();

  const filteredNav = React.useMemo(() => {
    return items?.filter((item) => item.roles.includes(role));
  }, [items, role]);

  React.useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="hidden items-center space-x-2 lg:flex">
        <img src={imgUrl} alt="Logo" className="w-10" />
        <span className="hidden font-bold sm:inline-block">
          KUD Jaya Makmur
        </span>
      </Link>
      <button
        className="flex items-center space-x-2 lg:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={filteredNav ?? []}>{children}</MobileNav>
      )}
    </div>
  );
}
