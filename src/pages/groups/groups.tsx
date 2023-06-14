import { deleteGroups } from "@/lib/api/groups";
import { useAuth } from "@/context/auth-context";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGroups } from "@/hooks/use-groups";
import { Icons } from "@/components/icons";

export default function Members() {
  const { auth } = useAuth();
  const { groups, mutate } = useGroups(auth.accessToken);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Kelompok">
        <div className="mt-2 flex md:flex-row flex-col gap-2">
          <Link to="/anggota/baru">
            <Button variant="secondary">
              <span>
                <Icons.add className="h-5 w-5 mr-1" />
              </span>
              Tambah Anggota
            </Button>
          </Link>
          <Link to="/kelompok/baru">
            <Button>
              <span>
                <Icons.add className="h-5 w-5 mr-1" />
              </span>
              Tambah Kelompok
            </Button>
          </Link>
        </div>
      </PageTitle>

      {groups && (
        <DataTable
          filterColumn="Kelompok"
          columns={columns}
          data={groups}
          selectable={true}
          deleteFunction={deleteGroups}
          mutate={mutate}
          columName="name"
        />
      )}
    </div>
  );
}
