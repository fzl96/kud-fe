import useSWR from "swr";
import {
  getCategories,
  categoriesApiEndpoint,
  deleteCategories,
} from "@/lib/api/categories";
import { useAuth } from "@/context/auth-context";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Categories() {
  const { auth } = useAuth();
  const { data, mutate } = useSWR(
    [categoriesApiEndpoint, auth.accessToken],
    () => getCategories(auth.accessToken),
    {
      onSuccess: (data) => {
        data.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      },
    }
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Kategori">
        <div className="mt-2 flex md:flex-row flex-col gap-2">
          <Link to="/barang/baru">
            <Button variant="secondary">Tambah Barang</Button>
          </Link>
          <Link to="/kategori/baru">
            <Button>Tambah Kategori</Button>
          </Link>
        </div>
      </PageTitle>

      {data && (
        <DataTable
          columns={columns}
          data={data}
          selectable={true}
          deleteFunction={deleteCategories}
          mutate={mutate}
        />
      )}
    </div>
  );
}
