import { useAuth } from "@/context/auth-context";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePurchases } from "@/hooks/use-purchases";
import { deletePurchases } from "@/lib/api/purchases";

export default function Purchases() {
  const { auth } = useAuth();
  const { purchases, loading, mutate, error } = usePurchases(auth.accessToken);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Pembelian">
        <div className="mt-2 flex md:flex-row flex-col gap-2">
          <Link to="/supplier/baru">
            <Button variant="secondary">Tambah Supplier</Button>
          </Link>
          <Link to="/pembelian/baru">
            <Button>Tambah pembelian</Button>
          </Link>
        </div>
      </PageTitle>

      {purchases && (
        <DataTable
          columns={columns}
          data={purchases}
          selectable={true}
          deleteFunction={deletePurchases}
          mutate={mutate}
        />
      )}
    </div>
  );
}
