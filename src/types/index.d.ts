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
  roles: string[];
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

export type CashierProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
  barcode: string;
};

export type CashierMember = {
  id: string;
  name: string;
};

export type CashierConfig = {
  products: CashierProduct[];
  members: CashierMember[];
};

type MemberSale = {
  id: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  status: string;
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }[];
};

export type Member = {
  id: string;
  name: string;
  phone?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  group: {
    id: string;
    name: string;
  };
  sales?: MemberSale[];
};

type GroupMember = {
  id: string;
  name: string;
  status: string;
  phone?: string;
  totalTransactions?: number;
};

export type Group = {
  id: string;
  name: string;
  numberOfMembers: number;
  leader: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  members?: GroupMember[];
};

type Monthly = {
  month: number;
  revenue: number;
  spending: number;
  salesCount: number;
};

export type ProductSale = {
  id: string;
  name: string;
  salesCount: number;
  quantityCount: number;
};

type Yearly = {
  revenue: number;
  spending: number;
  salesCount: number;
  avgTransaction: number;
  products: ProductSale[];
};

export type DashboardData = {
  monthlySales: Monthly[];
  yearlySales: Yearly;
};

export type Supplier = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
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
  member?: Pick<Customer, "id" | "name">;
  customerType: string;
  customerName?: string;
  total: number;
  cash?: number;
  change?: number;
  paymentMethod: string;
  status: string;
  paid?: number;
  payments?: {
    id: string;
    amount: number;
    note?: string;
    createdAt: string;
    updatedAt: string;
  }[];
  products: {
    id: string;
    name: string;
    quantity: number;
    total: number;
  }[];
  cashier: Pick<User, "id" | "name">;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  barcode: string;
  createdAt: string;
  updatedAt: string;
  category: Pick<Category, "id" | "name">;
};

export type Purchase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  total: number;
  supplier: Pick<Supplier, "id" | "name">;
  items?: {
    id: string;
    name: string;
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
  createdAt: string;
  updatedAt: string;
  customerType: string;
  customerName?: string;
  total: number;
  paymentMethod?: string;
  status?: string;
  user: Pick<User, "id" | "name">;
  member: Pick<Customer, "id" | "name">;
};
