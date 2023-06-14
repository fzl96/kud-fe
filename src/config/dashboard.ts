import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/",
      icon: "dashboard",
      section: "main",
      roles: ["Admin", "Kasir", "Ketua", "Bendahara"],
    },
    {
      title: "Kasir",
      href: "/kasir",
      icon: "cashier",
      section: "main",
      roles: ["Admin", "Kasir"],
    },
    {
      title: "Kategori",
      href: "/kategori",
      icon: "criteria",
      section: "goods",
      roles: ["Admin", "Kasir"],
    },
    {
      title: "Supplier",
      href: "/supplier",
      icon: "supplier",
      section: "goods",
      roles: ["Admin", "Kasir", "Bendahara"],
    },
    {
      title: "Barang",
      href: "/barang",
      icon: "barang",
      section: "goods",
      roles: ["Admin", "Kasir", "Bendahara"],
    },
    {
      title: "Penjualan",
      href: "/penjualan",
      icon: "penjualan",
      section: "transaction",
      roles: ["Admin", "Kasir"],
    },
    {
      title: "Pembelian",
      href: "/pembelian",
      icon: "pembelian",
      section: "transaction",
      roles: ["Admin", "Kasir", "Bendahara"],
    },
    {
      title: "Anggota",
      href: "/anggota",
      icon: "users",
      section: "member",
      roles: ["Admin"],
    },
    {
      title: "Kelompok",
      href: "/kelompok",
      icon: "group",
      section: "member",
      roles: ["Admin"],
    },
    {
      title: "Pengguna",
      href: "/pengguna",
      icon: "user",
      section: "user",
      roles: ["Admin"],
    },
  ],
};
