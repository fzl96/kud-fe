import { User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  section?: string;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[];
};

export type Category = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Supplier = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
  active?: boolean;
  category: Pick<Category, "id" | "name">;
  barcode?: string;
};

export type ProductWithCategory = {
  products: Product[];
  categories: Category[];
};

export type Role = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  permissions: String[];
};

export type User = {
  id: string;
  name: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  role: Pick<Role, "id" | "name" | "permissions">;
};

export type UserWithRole = {
  users: User[];
  roles: Role[];
};

export type Sale = {
  id: string;
  customer?: Pick<Customer, "id" | "name">;
  total: number;
  cash?: number;
  change?: number;
  paymentMethod: string;
  status: string;
  dueDate?: string;
  cashier: Pick<User, "id" | "name">;
  products: {
    id: string;
    name: string;
    quantity: number;
    total: number;
  }[];
  createdAt: string;
  updatedAt: string;
};

export type Group = {
  id: string;
  name: string;
  leader: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  members?: Pick<Customer, "id" | "name" | "status">[];
  numberOfMembers?: number;
};

export type Customer = {
  id: string;
  name: string;
  phone?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  group: Pick<Group, "id" | "name">;
  sales?: Sale[];
};

export type Purchase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  total: number;
  supplier: Pick<Supplier, "id" | "name">;
  items?: {
    id: string;
    purchasePrice: number;
    quantity: number;
    total: number;
  }[];
};

export type PurchaseWithSupplierProduct = {
  purchases: Purchase[];
  suppliers: Supplier[];
  products: Product[];
};

export type Sales = {
  id: string;
  customer: Pick<Customer, "id" | "name">;
  total: number;
  cash?: number;
  change?: number;
  paymentMethod?: string;
  status?: string;
  dueDate?: string;
  products: {
    id: string;
    name: string;
    quantity: number;
  }[];
  user: Pick<User, "id" | "name">;
  createdAt: string;
  updatedAt: string;
};
