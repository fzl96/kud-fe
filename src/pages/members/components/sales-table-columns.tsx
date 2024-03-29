import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { Sale } from "./schema";
import { DataTableColumnHeader } from "./sales-data-table-column-header";
import { SaleTableOperation } from "@/components/sale-table-operation";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Metode Pembayaran" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("paymentMethod")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
      return (
        <div className="flex items-center">
          <span>{formatter.format(row.getValue("total"))}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex items-center">
          <span
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-semibold",
              status === "SELESAI"
                ? "bg-[#e1f8ea] text-green-600"
                : status === "PROSES"
                ? "bg-[#fcf4db] text-[#ff8a00]"
                : "bg-[#fbdddd] text-[#e96c6c]"
            )}
          >
            {row.getValue("status") === "SELESAI"
              ? "Selesai"
              : row.getValue("status") === "PROSES"
              ? "Proses"
              : "Batal"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => {
      const date: Date = new Date(row.getValue("createdAt"));
      return (
        <div className="flex flex-col">
          <span className="text-[0.9063rem]">{format(date, "dd-MM-yyyy")}</span>
          <span className="text-xs text-gray-500">
            {format(date, "HH:mm:ss 'WIB'")}
          </span>
        </div>
      );
    },
  },
  {
    id: "operation",
    cell: ({ row }) => (
      <SaleTableOperation link={`/penjualan/${row.original.id}`} />
    ),
  },
];
