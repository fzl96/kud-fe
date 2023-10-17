import { deleteMembers } from "@/lib/api/members";
import { useAuth } from "@/context/auth-context";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMembers } from "@/hooks/use-members";
import { Icons } from "@/components/icons";
import { TableSkeleton } from "@/components/table-skeleton";

export default function Members() {
  const { auth } = useAuth();
  const { members, mutate } = useMembers(auth.accessToken);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Anggota">
        <div className="mt-2 flex md:flex-row flex-col gap-2">
          <Link to="/kelompok/baru">
            <Button variant="secondary">
              <span>
                <Icons.add className="h-5 w-5 mr-1" />
              </span>
              Tambah Kelompok
            </Button>
          </Link>
          <Link to="/anggota/baru">
            <Button>
              <span>
                <Icons.add className="h-5 w-5 mr-1" />
              </span>
              Tambah anggota
            </Button>
          </Link>
        </div>
      </PageTitle>

      {!members ? (
        <TableSkeleton />
      ) : (
        <DataTable
          filterColumn="Anggota"
          columns={columns}
          data={members.data}
          selectable={true}
          deleteFunction={deleteMembers}
          mutate={mutate}
          columName="name"
        />
      )}
    </div>
  );
}
