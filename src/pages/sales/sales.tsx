import { useAuth } from "@/context/auth-context";
import { columns } from "@/pages/sales/columns";
import { DataTable } from "./data-table";
import { PageTitle } from "@/components/page-title";
import { deleteSales } from "@/lib/api/sales";
import { useSales } from "@/hooks/use-sales";
import { useCustomers } from "@/hooks/use-customers";

export default function Sales() {
  const { auth } = useAuth();
  const { sales, loading, mutate } = useSales(auth.accessToken);
  const { members } = useCustomers(auth.accessToken);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Penjualan" />

      {sales && !loading && (
        <DataTable
          customers={members}
          columns={columns}
          data={sales}
          selectable={true}
          deleteFunction={deleteSales}
          mutate={mutate}
        />
      )}
    </div>
  );
}
