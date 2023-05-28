"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  members: {
    value: string;
    label: string;
  }[];
  cashiers: {
    value: string;
    label: string;
  }[];
}

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
        {table.getColumn("member") && (
          <DataTableFacetedFilter
            column={table.getColumn("member")}
            title="Cari Anggota"
            options={members}
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
