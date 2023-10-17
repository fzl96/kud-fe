import { Card } from "@/components/card";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPurchase, purchasesApiEndpoint } from "@/lib/api/purchases";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <Label className="font-normal">{label}</Label>
      <Input
        className="disabled:opacity-100 text-base disabled:cursor-text font-[500]"
        value={value}
        disabled
      />
    </div>
  );
}

export default function PurchaseIdDetails() {
  const { id } = useParams();
  const { data: purchase } = useSWR(`${purchasesApiEndpoint}/${id}`, () =>
    getPurchase(id)
  );

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <Card title="Detail Pembelian" titleClass="font-semibold text-xl">
      {purchase && (
        <div className="space-y-3">
          <Field
            label="Tanggal"
            value={
              format(new Date(purchase.createdAt), "dd MMM yyyy HH:mm") + " WIB"
            }
          />
          <Field label="Supplier" value={purchase.supplier.name} />
          <Field label="Total" value={formatter.format(purchase.total)} />
          <div className="space-y-2">
            <Label className="font-normal">Barang</Label>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Harga Beli</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchase.items?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {formatter.format(item.purchasePrice)}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatter.format(item.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
