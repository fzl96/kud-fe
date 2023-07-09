import useSWR from "swr";
import { getGroup, groupsApiEndpoint } from "@/lib/api/groups";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { YearSelect } from "@/components/year-select";
import { MonthSelect } from "@/components/month-select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { GroupDetailsTableOperation } from "@/components/group-details-table-operation";

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

export default function GroupDetails() {
  const { id } = useParams();
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const { data: group } = useSWR(
    [`${groupsApiEndpoint}/${id}`, year, month],
    () => getGroup(id, true, year, month)
  );

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <div className="flex flex-col gap-4">
      <Card title={`Detail Kelompok`}>
        {!group ? (
          <>
            <h1>loading...</h1>
          </>
        ) : (
          <div className="space-y-3">
            <Field label="Nama Kelompok" value={group?.name} />
            <Field label="Ketua Kelompok" value={group?.leader.name ?? ""} />
            <Field
              label="Jumlah Anggota"
              value={group?.members?.length.toString() || "0"}
            />
            <Separator />
            <div className="space-y-2">
              <Label className="font-normal">
                Daftar Anggota dan Jumlah Transaksi {month}/{year}
              </Label>
              <div className="flex gap-3">
                <MonthSelect month={month} onChange={setMonth} />
                <YearSelect year={year} setYear={setYear} />
              </div>
              <div className="border rounded-lg">
                <Table className="mb-2">
                  <TableHeader>
                    <TableRow>
                      <TableHead>No.</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Jumlah Transaksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group?.members?.map((member, index) => (
                      <TableRow key={member.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.status}</TableCell>
                        <TableCell>
                          {formatter.format(member.totalTransactions ?? 0)}
                        </TableCell>
                        <TableCell className="max-w-[5rem]">
                          <GroupDetailsTableOperation id={member.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
