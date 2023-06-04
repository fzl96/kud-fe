import { deleteCustomers } from "@/lib/api/customers";
import { useAuth } from "@/context/auth-context";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCustomers } from "@/hooks/use-customers";

export default function Members() {
  const { auth } = useAuth();
  const { members, mutate } = useCustomers(auth.accessToken);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Anggota">
        <div className="mt-2 flex md:flex-row flex-col gap-2">
          <Link to="/kelompok/baru">
            <Button variant="secondary">Tambah Kelompok</Button>
          </Link>
          <Link to="/anggota/baru">
            <Button>Tambah anggota</Button>
          </Link>
        </div>
      </PageTitle>

      {members && (
        <DataTable
          filterColumn="Anggota"
          columns={columns}
          data={members}
          selectable={true}
          deleteFunction={deleteCustomers}
          mutate={mutate}
        />
      )}
    </div>
  );
}
