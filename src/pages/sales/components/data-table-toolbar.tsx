"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

type Option = {
  value: string;
  label: string;
};
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  members: Option[];
  cashiers: Option[];
}

const paymentMethods: Option[] = [
  {
    value: "Tunai",
    label: "Tunai",
  },
  {
    value: "Kredit",
    label: "Kredit",
  },
];

const statuses: Option[] = [
  {
    value: "Selesai",
    label: "Selesai",
  },
  {
    value: "Proses",
    label: "Proses",
  },
];

export function DataTableToolbar<TData>({
  table,
  members,
  cashiers,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("cashier") && (
          <DataTableFacetedFilter
            column={table.getColumn("cashier")}
            title="Cari Kasir"
            options={cashiers}
          />
        )}
        {table.getColumn("customerName") && (
          <DataTableFacetedFilter
            column={table.getColumn("customerName")}
            title="Cari Pelanggan"
            options={members}
          />
        )}
        {table.getColumn("paymentMethod") && (
          <DataTableFacetedFilter
            column={table.getColumn("paymentMethod")}
            title="Metode Pembayaran"
            options={paymentMethods}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
