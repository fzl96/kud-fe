import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableOperation } from "@/components/table-operation";

export const columns: ColumnDef<User, any>[] = [
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
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Nama</span>
          <ChevronsUpDown size={16} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-[0.9063rem]">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => (
      <div className="py-1 flex flex-col">
        <span className="text-[0.9063rem]">{row.original.username}</span>
      </div>
    ),
  },
  {
    accessorKey: "role.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Role</span>
          <ChevronsUpDown size={16} />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="pl-4 py-1 flex flex-col">
        <span className="text-[0.9063rem]">{row.original.role?.name}</span>
      </div>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Dibuat</span>
          <ChevronsUpDown size={16} />
        </Button>
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
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Diubah</span>
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
    cell: ({ row }) => <TableOperation link={`/pengguna/${row.original.id}`} />,
  },
];
