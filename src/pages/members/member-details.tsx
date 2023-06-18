import { Card } from "@/components/card";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getMember, membersApiEndpoint } from "@/lib/api/members";
import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { YearSelect } from "@/components/year-select";
import { MonthSelect } from "@/components/month-select";
import { DataTable } from "./components/sales-data-table";
import { columns } from "./components/sales-table-columns";
import { Separator } from "@/components/ui/separator";

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="space-y-2">
      <Label className="font-normal">{label ?? ""}</Label>
      <Input
        className="disabled:opacity-100 text-base disabled:cursor-text font-[500]"
        value={value ?? ""}
        disabled
      />
    </div>
  );
}

const months = [
  { id: 1, name: "Januari" },
  { id: 2, name: "Februari" },
  { id: 3, name: "Maret" },
  { id: 4, name: "April" },
  { id: 5, name: "Mei" },
  { id: 6, name: "Juni" },
  { id: 7, name: "Juli" },
  { id: 8, name: "Agustus" },
  { id: 9, name: "September" },
  { id: 10, name: "Oktober" },
  { id: 11, name: "November" },
  { id: 12, name: "Desember" },
];

export default function MemberDetails() {
  const { id } = useParams();
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);
  const {
    data: member,
    isLoading,
    error,
  } = useSWR([`${membersApiEndpoint}/${id}`, year, month], () =>
    getMember(id, true, year, month)
  );

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const totalSales = useMemo(() => {
    if (!member || !member.sales) return 0;
    return member?.sales?.reduce((acc, sale) => acc + sale.total, 0);
  }, [member]);

  return (
    <div className="flex flex-col gap-4">
      <Card
        title={`Anggota: ${member?.name}`}
        titleClass="font-semibold text-xl"
      >
        {member && (
          <div className="space-y-3">
            <Field label="Nama" value={member.name} />
            <Field label="Nomor Telepon" value={member.phone} />
            <Field label="Kelompok" value={member.group.name} />
            <Field label="Status Anggota" value={member.status} />
            <Separator />
            <h1 className="font-medium">Riwayat Transaksi</h1>
            <div className="space-y-2">
              <Label className="font-normal">Pilih Tahun dan Bulan</Label>
              <div className="flex gap-3">
                <MonthSelect month={month} onChange={setMonth} />
                <YearSelect year={year} setYear={setYear} />
              </div>
            </div>
            <Field
              label={`Total Transaksi Bulan ${
                months.find((m) => m.id === month)?.name
              }`}
              value={formatter.format(totalSales)}
            />
            <div className="space-y-3">
              <Label className="font-normal">
                Daftar transaksi pada tahun {year} bulan{" "}
                {months.find((m) => m.id === month)?.name}
              </Label>
              {member.sales && member.sales.length !== 0 && (
                <DataTable
                  data={member.sales?.map((sale) => {
                    console.log(sale);
                    return {
                      id: sale.id,
                      total: sale.total,
                      paymentMethod: sale.paymentMethod,
                      createdAt: sale.createdAt,
                      status: sale.status,
                    };
                  })}
                  columns={columns}
                />
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
