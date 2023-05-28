import { useAuth } from "@/context/auth-context";
import { columns } from "@/pages/sales/components/columns";
import { DataTable } from "./components/data-table";
import { PageTitle } from "@/components/page-title";
import { deleteSales } from "@/lib/api/sales";
import { useSales } from "@/hooks/use-sales";
import { useCustomers } from "@/hooks/use-customers";
import { useMemo } from "react";
import { useUsersRoles } from "@/hooks/use-users-roles";

export default function Sales() {
  const { auth } = useAuth();
  const { sales, loading, mutate } = useSales(auth.accessToken);
  const { members } = useCustomers(auth.accessToken);
  const { users } = useUsersRoles(auth.accessToken);

  const mappedMembers = useMemo(() => {
    if (!members) return [];
    return members.map((member) => ({
      label: member.name,
      value: member.name,
    }));
  }, [members]);

  const mappedUsers = useMemo(() => {
    if (!users) return [];
    return users.map((user) => ({
      label: user.name,
      value: user.name,
    }));
  }, [users]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Penjualan" />

      {sales && !loading && members && (
        <DataTable
          data={sales.map((sale) => ({
            id: sale.id,
            cashier: sale.user.name as string,
            member: sale.customer ? sale.customer.name : "Umum",
            total: sale.total,
            paymentMethod: sale.paymentMethod === "TUNAI" ? "Tunai" : "Kredit",
            createdAt: sale.createdAt,
          }))}
          columns={columns}
          members={[{ label: "Umum", value: "Umum" }, ...mappedMembers]}
          cashiers={mappedUsers}
        />
      )}
    </div>
  );
}
