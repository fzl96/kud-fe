import { ColumnDef } from "@tanstack/react-table";
import { Member } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { TableOperation } from "@/components/table-operation";
import { MembersTableOperation } from "@/components/members-table-operation";

export const columns: ColumnDef<Member, any>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-slate-100 px-3 py-2 rounded-md"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Nama</span>
          <ChevronsUpDown size={16} />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-[0.9063rem]">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "No. Telepon",
    cell: ({ row }) => (
      <div className="py-1 flex flex-col">
        <span className="text-[0.9063rem]">{row.original.phone}</span>
      </div>
    ),
  },
  {
    accessorKey: "group.name",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-slate-100 px-3 py-2 rounded-md"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Kelompok</span>
          <ChevronsUpDown size={16} />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4 py-1 flex flex-col">
        <span className="text-[0.9063rem]">
          {row.original.group?.name || ""}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-slate-100 px-3 py-2 rounded-md"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Status Anggota</span>
          <ChevronsUpDown size={16} />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4 py-1 flex flex-col">
        <span className="text-[0.9063rem]">{row.original.status}</span>
      </div>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-slate-100 px-3 py-2 rounded-md"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Dibuat</span>
          <ChevronsUpDown size={16} />
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4 py-1 flex flex-col">
        <span className="text-[0.9063rem]">
          {format(new Date(row.original.createdAt), "dd-MM-yyyy")}
        </span>
        <span className="text-xs text-gray-500">
          {format(new Date(row.original.createdAt), "HH:mm:ss 'WIB'")}
        </span>
      </div>
    ),
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2 hover:bg-slate-100 px-3 py-2 rounded-md"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Diubah</span>
          <ChevronsUpDown size={16} />
        </button>
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
    cell: ({ row }) => <MembersTableOperation id={row.original.id} />,
  },
];
