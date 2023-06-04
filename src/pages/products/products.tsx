import { deleteProducts } from "@/lib/api/products";
import { useAuth } from "@/context/auth-context";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/use-products";

export default function Products() {
  const { auth } = useAuth();
  const { products, mutate } = useProducts(auth.accessToken);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Barang">
        <div className="mt-2 flex md:flex-row flex-col gap-2">
          <Link to="/kategori/baru">
            <Button variant="secondary">Tambah Kategori</Button>
          </Link>
          <Link to="/barang/baru">
            <Button>Tambah barang</Button>
          </Link>
        </div>
      </PageTitle>

      {products && (
        <DataTable
          filterColumn="Barang"
          columns={columns}
          data={products}
          selectable={true}
          deleteFunction={deleteProducts}
          mutate={mutate}
        />
      )}
    </div>
  );
}
