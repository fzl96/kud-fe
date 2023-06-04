import { Table } from "@tanstack/react-table";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useToast } from "@/components/ui/use-toast";
import { deleteSales } from "@/lib/api/sales";
import { useState } from "react";
import { isAxiosError } from "axios";
import { Icons } from "@/components/icons";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  mutate: () => void;
  // ids: string[];
}

interface WithId {
  id?: string;
}

export function DataTablePagination<TData extends WithId>({
  table,
  mutate,
}: // ids,
DataTablePaginationProps<TData>) {
  const { toast } = useToast();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <div className="flex items-center justify-between px-2 pb-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
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
        <div>
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
                      await deleteSales(ids);
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
      </div>
      <div className="flex items-center flex-col md:flex-row space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Baris per halaman</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[120px] items-center justify-center text-sm font-medium">
          Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
