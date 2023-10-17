import { useAuth } from "@/context/auth-context";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePurchases } from "@/hooks/use-purchases";
import { deletePurchases } from "@/lib/api/purchases";
import { Icons } from "@/components/icons";
import { TableSkeleton } from "@/components/table-skeleton";

export default function Purchases() {
  const { auth } = useAuth();
  const { purchases, mutate } = usePurchases(auth.accessToken);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Pembelian">
        <div className="mt-2 flex md:flex-row flex-col gap-2">
          <Link to="/supplier/baru">
            <Button variant="secondary">
              <span>
                <Icons.add className="h-5 w-5 mr-1" />
              </span>
              Tambah Supplier
            </Button>
          </Link>
          <Link to="/pembelian/baru">
            <Button>
              <span>
                <Icons.add className="h-5 w-5 mr-1" />
              </span>
              Tambah pembelian
            </Button>
          </Link>
        </div>
      </PageTitle>

      {!purchases ? (
        <TableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={purchases.data}
          selectable={true}
          deleteFunction={deletePurchases}
          mutate={mutate}
          columName="supplier"
          filterColumn="Supplier"
        />
      )}
    </div>
  );
}
