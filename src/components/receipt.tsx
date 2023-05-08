import { useAuth } from "../context/authContext";
import { format } from "date-fns";

interface Props {
  selectedItems: any;
  totalPrice: number;
  cash: number;
  change: number;
  discount?: number;
}

export default function Receipt({
  selectedItems,
  totalPrice,
  cash,
  change,
  discount,
}: Props) {
  const { auth } = useAuth();
  const date = new Date();
  const formattedDate = format(date, "dd.MM.yyyy-HH:mm");

  return (
    <div className="bg-white text-gray-800 rounded-lg">
      <h1 className="font-semibold text-2xl text-center">KUD JAYA MAKMUR</h1>
      <br />
      <div className="font-robotoMono px-5">
        {/* <span>----------------------------------------</span> */}
        <div className="border-t-2 border-gray-600 mb-4 w-full border-dashed" />
        <div className="w-full flex justify-between">
          <p>{formattedDate}</p>
          <p>Kasir: {auth?.user?.name}</p>
        </div>
        <div className="border-t-2 border-gray-600 my-4 w-full border-dashed" />
        <table className="w-full">
          <tbody>
            {selectedItems.map((item: any) => (
              <tr key={item.id} className="">
                <td className="text-left ">{item.name}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-right">
                  {item.price.toLocaleString("de-DE", {
                    minimumFractionDigit: 0,
                  })}
                </td>
                <td className="text-right">
                  {(item.price * item.quantity).toLocaleString("de-DE")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-right">-----------------------</p>
        <div className="flex justify-end">
          <table className="">
            <tbody>
              <tr>
                <td className="text-left">Total</td>
                <td className="text-right">
                  {totalPrice.toLocaleString("de-DE")}
                </td>
              </tr>
              <tr>
                <td colSpan={2}>-----------------------</td>
              </tr>
              <tr>
                <td className="text-left">Total</td>
                <td className="text-right">
                  {totalPrice.toLocaleString("de-DE")}
                </td>
              </tr>
              <tr>
                <td className="text-left min-w-[5rem]">Tunai</td>
                <td className="text-right">
                  {cash.toLocaleString("de-DE", { minimumFractionDigits: 0 })}
                </td>
              </tr>
              <tr>
                <td className="text-left">Kembali</td>
                <td className="text-right">{change.toLocaleString("de-DE")}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1 className="font-serif text text-center mt-7">Terima Kasih</h1>
        <h1 className="text-center text mb-5">Selamat Berbelanja Kembali</h1>
      </div>
    </div>
  );
}
