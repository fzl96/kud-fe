import { ColumnDef } from "@tanstack/react-table";
import { Sales } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableOperation } from "@/components/table-operation";
import { cn } from "@/lib/utils";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export const columns: ColumnDef<Sales, any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onClick={(e) => e.stopPropagation()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Kasir</span>
          <ChevronsUpDown size={16} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-[0.9063rem]">{row.original.user.name ?? ""}</span>
      </div>
    ),
  },
  {
    id: "customer",
    accessorKey: "customer.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Pelanggan</span>
          <ChevronsUpDown size={16} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4 flex flex-col">
        <span className=" text-[0.9063rem]">
          {row.original.customer ? row.original.customer.name : "Umum"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Kategori",
    cell: ({ row }) => (
      <div className="py-1 flex flex-col">
        <span className="text-[0.9063rem]">
          {formatter.format(row.original.total)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Metode Pembayaran</span>
          <ChevronsUpDown size={16} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4 py-1 flex flex-col">
        <span className="text-[0.9063rem]">
          {row.original.paymentMethod === "TUNAI" ? "Tunai" : "Kredit"}
        </span>
      </div>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Status</span>
          <ChevronsUpDown size={16} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="py-1 flex flex-col">
        <span
          className={cn(
            "text-[0.9063rem] w-fit px-2 py-1 rounded-md",
            row.original.status === "SELESAI"
              ? "text-green-600 bg-[#e1f8ea]"
              : "bg-[#fcf4db] text-[#ff8a00]"
          )}
        >
          {row.original.status === "SELESAI" ? "Selesai" : "Proses"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Tanggal</span>
          <ChevronsUpDown size={16} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4 py-1 flex flex-col">
        <span className="text-[0.9063rem]">
          {format(new Date(row.original.updatedAt), "dd-MM-yyyy")}
        </span>
        <span className="text-xs text-gray-500">
          {format(new Date(row.original.updatedAt), "HH:mm:ss 'WIB'")}
        </span>
      </div>
    ),
  },
  {
    id: "operation",
    cell: ({ row }) => (
      <TableOperation link={`/pembelian/${row.original.id}`} />
    ),
  },
];
