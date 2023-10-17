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
import { Icons } from "@/components/icons";

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
        data.data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      },
    }
  );

  console.log(data)

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Supplier">
        <div className="mt-2">
          <Link to="/supplier/baru">
            <Button>
              {" "}
              <span>
                <Icons.add className="h-5 w-5 mr-1" />
              </span>
              Tambah Supplier
            </Button>
          </Link>
        </div>
      </PageTitle>

      {data && (
        <DataTable
          filterColumn="Supplier"
          columns={columns}
          data={data.data}
          selectable={true}
          deleteFunction={deleteSuppliers}
          mutate={mutate}
          columName="name"
        />
      )}
    </div>
  );
}
