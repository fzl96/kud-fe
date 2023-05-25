import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/",
      icon: "dashboard",
      section: "main",
    },
    {
      title: "Kasir",
      href: "/kasir",
      icon: "cashier",
      section: "main",
    },
    {
      title: "Kategori",
      href: "/kategori",
      icon: "criteria",
      section: "goods",
    },
    {
      title: "Supplier",
      href: "/supplier",
      icon: "supplier",
      section: "goods",
    },
    {
      title: "Barang",
      href: "/barang",
      icon: "barang",
      section: "goods",
    },
    {
      title: "Penjualan",
      href: "/penjualan",
      icon: "penjualan",
      section: "transaction",
    },
    {
      title: "Pembelian",
      href: "/pembelian",
      icon: "pembelian",
      section: "transaction",
    },
    {
      title: "Anggota",
      href: "/anggota",
      icon: "users",
      section: "member",
    },
    {
      title: "Kelompok",
      href: "/kelompok",
      icon: "group",
      section: "member",
    },
    {
      title: "Pengguna",
      href: "/pengguna",
      icon: "user",
      section: "user",
    },
  ],
};
