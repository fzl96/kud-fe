import * as React from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { toast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";
import { isAxiosError } from "axios";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectable?: boolean;
  mutate: () => void;
  deleteFunction: (ids: string[]) => Promise<void>;
  filterColumn?: string;
  columName: string;
}

interface WithId {
  id?: string;
}

export function DataTable<TData extends WithId, TValue>({
  columns,
  data,
  selectable = true,
  mutate,
  deleteFunction,
  filterColumn,
  columName,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    initialState: {
      sorting: [],
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div>
      <div className="flex items-center pb-4">
        <Input
          placeholder={`Cari ${filterColumn}`}
          value={(table.getColumn(columName)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(columName)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border max-w-full overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>{" "}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground items-center">
          {selectable && (
            <div className="flex gap-2 items-center">
              <div>
                {table.getFilteredSelectedRowModel().rows.length} dari{" "}
                {table.getFilteredRowModel().rows.length} baris dipilih.
              </div>
              {table.getFilteredSelectedRowModel().rows.length > 0 && (
                <Button
                  onClick={() => setShowDeleteAlert(true)}
                  className="bg-red-500 hover:bg-red-600 hover:text-white"
                  size="sm"
                >
                  Hapus {table.getFilteredSelectedRowModel().rows.length} item
                </Button>
              )}
            </div>
          )}
          <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Apakah anda yakin ingin menghapus item?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Aksi ini tidak dapat diurungkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-500 hover:bg-red-600 focus:ring-red-600"
                  onClick={async (event: any) => {
                    event.preventDefault();
                    setIsDeleteLoading(true);

                    const ids = table
                      .getFilteredSelectedRowModel()
                      .rows.map((row) => row.original.id as string);

                    try {
                      await deleteFunction(ids);
                      setIsDeleteLoading(false);
                      setShowDeleteAlert(false);
                      mutate();
                      return toast({
                        description: (
                          <h1 className="flex items-center gap-3">
                            <CheckCircle className="text-green-600 " />
                            <span>Data berhasil dihapus.</span>
                          </h1>
                        ),
                      });
                    } catch (error) {
                      if (isAxiosError(error)) {
                        setIsDeleteLoading(false);
                        setShowDeleteAlert(false);
                        return toast({
                          title: "Terjadi kesalahan",
                          description: error.response?.data.error,
                          variant: "destructive",
                        });
                      }
                      return toast({
                        title: "Terjadi kesalahan",
                        description: "Gagal menghapus data.",
                        variant: "destructive",
                      });
                    }
                  }}
                >
                  {isDeleteLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Icons.trash className="mr-2 h-4 w-4" />
                  )}
                  <span>Hapus</span>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
