import { Card } from "@/components/card";
import { useSale } from "@/hooks/use-sale";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

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
  const { sale, isLoading, error } = useSale(id);
  const date = new Date();
  // format date to : 16 May 2023 20:25 WIB using date-fns

  return (
    <>
      <Card title="Detail Transaksi">
        {sale && (
          <div className="space-y-3">
            <Field
              label="Tanggal"
              value={format(date, "dd MMM yyyy HH:mm") + " WIB"}
            />
            <Field label="Kasir" value={sale.cashier.name} />
            <Field label="Anggota" value={sale.customer?.name ?? "Umum"} />
            <div className="space-y-2">
              <Label className="font-normal">Barang</Label>
              <div className="space-y-2 flex border px-4 py-3 rounded-lg font-medium flex-col">
                {sale.products.map((product, index) => (
                  <>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-base">{product.name}</span>
                        <span className="text-base">x{product.quantity}</span>
                      </div>
                    </div>
                    {index !== sale.products.length - 1 && <Separator />}
                  </>
                ))}
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
          </div>
        )}
      </Card>
    </>
  );
}
