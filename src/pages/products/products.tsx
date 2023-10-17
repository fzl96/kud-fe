import { deleteProducts } from "@/lib/api/products";
import { useAuth } from "@/context/auth-context";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/use-products";
import { Icons } from "@/components/icons";
import { exportProducts } from "@/lib/api/products";
import { useState } from "react";
import { saveAs } from "file-saver";
import { TableSkeleton } from "@/components/table-skeleton";

export default function Products() {
  const { auth } = useAuth();
  const { products, mutate } = useProducts(auth.accessToken);
  const [loading, setLoading] = useState<boolean>(false);

  const handleExport = async () => {
    // e.preventDefault();
    console.log("Exporting...");
    setLoading(true);
    const data = await exportProducts(auth.accessToken);
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    setLoading(false);
    saveAs(blob, "Barang.xlsx");
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Barang">
        <div className="mt-2 flex md:flex-row flex-col gap-2">
          <Button variant="secondary" onClick={handleExport}>
            <span>
              {loading ? (
                <Icons.spinner className="animate-spin h-5 w-5 mr-1" />
              ) : (
                <Icons.alternative className="h-5 w-5 mr-1" />
              )}
            </span>
            Export
          </Button>
          <Link to="/barang/baru">
            <Button>
              <span>
                <Icons.add className="h-5 w-5 mr-1" />
              </span>
              Tambah barang
            </Button>
          </Link>
        </div>
      </PageTitle>

      {!products ? (
        <TableSkeleton />
      ) : (
        <DataTable
          filterColumn="Barang"
          columns={columns}
          data={products.data}
          selectable={true}
          deleteFunction={deleteProducts}
          mutate={mutate}
          columName="name"
        />
      )}
    </div>
  );
}
