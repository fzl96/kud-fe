import { useAuth } from "@/context/auth-context";
import { columns } from "@/pages/sales/components/columns";
import { DataTable } from "./components/data-table";
import { PageTitle } from "@/components/page-title";
import { deleteSales } from "@/lib/api/sales";
import { useSales } from "@/hooks/use-sales";
import { useMembers } from "@/hooks/use-members";
import { useMemo } from "react";
import { useUsersRoles } from "@/hooks/use-users-roles";
import { TableSkeleton } from "@/components/table-skeleton";

export default function Sales() {
  const { auth } = useAuth();
  const { sales, loading, mutate } = useSales(auth.accessToken);
  const { members } = useMembers(auth.accessToken);
  const { users } = useUsersRoles(auth.accessToken);

  const mappedMembers = useMemo(() => {
    if (!members) return [];
    return members.data.map((member) => ({
      label: member.name,
      value: member.name,
    }));
  }, [members]);

  const mappedUsers = useMemo(() => {
    if (!users) return [];
    return users.data
      .filter((user) => ["Admin", "Kasir"].includes(user.role.name))
      .map((user) => ({
        label: user.name,
        value: user.name,
      }));
  }, [users]);

  const customerNames = useMemo(() => {
    if (!sales) return [];
    const uniqueNames = sales.data.reduce((acc, curr) => {
      if (curr.customerType === "ANGGOTA" && curr.customerType === "ANGGOTA") {
        return acc; // Skip adding to `acc` if customerType is 'ANGGOTA'
      }
      if (!acc.some((item) => item.label === curr.customerName)) {
        acc.push({
          label: curr.customerName ?? "",
          value: curr.customerName ?? "",
        });
      }
      return acc;
    }, [] as { label: string; value: string }[]);
    return uniqueNames;
  }, [sales]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle heading="Penjualan" />

      {!sales || !members || loading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          data={sales.data.map((sale) => ({
            id: sale.id,
            cashier: sale.user.name as string,
            customerType: sale.customerType,
            customerName:
              sale.customerType === "ANGGOTA"
                ? sale.member.name
                : sale.customerName ?? "",
            // member: sale.customer ? sale.customer.name : "Umum",
            total: sale.total,
            status: sale.status === "SELESAI" ? "Selesai" : "Proses",
            paymentMethod: sale.paymentMethod === "TUNAI" ? "Tunai" : "Kredit",
            createdAt: sale.createdAt,
          }))}
          columns={columns}
          members={[...customerNames, ...mappedMembers]}
          cashiers={mappedUsers}
          mutate={mutate}
        />
      )}
    </div>
  );
}
