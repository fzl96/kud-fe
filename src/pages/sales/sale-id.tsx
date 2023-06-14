import { Card } from "@/components/card";
import { useSale } from "@/hooks/use-sale";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CreditPayment } from "@/components/credit-payment";
import { CreditPaymentOperation } from "@/components/credit-payment-operation";

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

export default function SaleId() {
  const { id } = useParams();
  const { sale, isLoading, error, mutate } = useSale(id);
  const date = new Date();
  // format date to : 16 May 2023 20:25 WIB using date-fns
  const status = sale?.status === "SELESAI" ? "Selesai" : "Proses";

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const disabled = sale?.status === "SELESAI";

  return (
    <>
      <Card
        title={
          <div className="flex items-center justify-between">
            <h1 className="text-lg">Detail Transaksi</h1>
            <span
              className={cn(
                "px-3 py-2 rounded-lg text-base",
                status === "Selesai"
                  ? "bg-[#e1f8ea] text-green-600"
                  : status === "Proses"
                  ? "bg-[#fcf4db] text-[#ff8a00]"
                  : "bg-[#fbdddd] text-[#e96c6c]"
              )}
            >
              {status}
            </span>
          </div>
        }
      >
        {sale && (
          <div className="space-y-4">
            <Field
              label="Tanggal"
              value={
                format(new Date(sale.createdAt), "dd MMM yyyy HH:mm") + " WIB"
              }
            />
            <Field label="Kasir" value={sale.cashier.name} />
            <Field label="Pelanggan" value={sale.customer?.name ?? "Umum"} />
            <div className="space-y-2">
              <Label className="font-normal">Barang</Label>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Barang</TableHead>
                      <TableHead>Jumlah</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sale.products.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-[500] text-base">
                          {item.name}
                        </TableCell>
                        <TableCell className="font-[500] text-base">
                          {item.quantity}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <Field
              label="Total"
              value={new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(sale.total)}
            />
            <Field
              label="Metode Pembayaran"
              value={sale.paymentMethod === "TUNAI" ? "Tunai" : "Kredit"}
            />
            {sale.paymentMethod === "TUNAI" && (
              <>
                <Field label="Tunai" value={formatter.format(sale.cash || 0)} />
                <Field
                  label="Kembalian"
                  value={formatter.format(sale.change || 0)}
                />
              </>
            )}
            {sale.paymentMethod === "KREDIT" && (
              <>
                <CreditPayment
                  id={sale.id}
                  mutate={mutate}
                  disabled={disabled}
                />
                <Field
                  label="Jumlah Yang Telah Dibayar"
                  value={formatter.format(sale.paid || 0)}
                />
                <div className="space-y-2">
                  <Label className="font-normal">Riwayat Pembayaran</Label>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tanggal</TableHead>
                          <TableHead>Jumlah</TableHead>
                          <TableHead>Catatan</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sale.payments &&
                          sale.payments.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-[500] text-base">
                                {format(
                                  new Date(item.createdAt),
                                  "dd MMM yyyy"
                                )}
                              </TableCell>
                              <TableCell className="font-[500] text-base">
                                {formatter.format(item.amount)}
                              </TableCell>
                              <TableCell className="font-[500] text-base">
                                {item.note}
                              </TableCell>
                              <TableCell className="font-[500] text-base">
                                <CreditPaymentOperation
                                  payment={item}
                                  onSuccess={mutate}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </Card>
    </>
  );
}
