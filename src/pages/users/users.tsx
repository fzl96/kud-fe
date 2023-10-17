import { deleteUsers } from "@/lib/api/users";
import { useAuth } from "@/context/auth-context";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUsersRoles } from "@/hooks/use-users-roles";
import { Icons } from "@/components/icons";

export default function Users() {
  const { auth } = useAuth();
  const { users, error, mutate, loading } = useUsersRoles(auth.accessToken);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Pengguna">
        <div className="mt-2">
          <Link to="/pengguna/baru">
            <Button>
              <span>
                <Icons.add className="h-5 w-5 mr-1" />
              </span>
              Tambah pengguna
            </Button>
          </Link>
        </div>
      </PageTitle>

      {users && (
        <DataTable
          filterColumn="Pengguna"
          columns={columns}
          data={users.data}
          selectable={true}
          deleteFunction={deleteUsers}
          mutate={mutate}
          columName="name"
        />
      )}
    </div>
  );
}
