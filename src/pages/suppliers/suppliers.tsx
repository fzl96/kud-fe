import useSWR from "swr";
import {
  getSuppliers,
  suppliersApiEndpoint,
  deleteSuppliers,
} from "@/lib/api/suppliers";
import { useAuth } from "@/context/auth-context";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Categories() {
  const { auth } = useAuth();
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR(
    [suppliersApiEndpoint, auth.accessToken],
    () => getSuppliers(auth.accessToken),
    {
      onSuccess: (data) => {
        data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      },
    }
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Supplier">
        <div className="mt-2">
          <Link to="/supplier/baru">
            <Button>Tambah Supplier</Button>
          </Link>
        </div>
      </PageTitle>

      {data && (
        <DataTable
          columns={columns}
          data={data}
          selectable={true}
          deleteFunction={deleteSuppliers}
          mutate={mutate}
        />
      )}
    </div>
  );
}
