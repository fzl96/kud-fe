import { useProducts } from "@/hooks/use-products";
import { useCustomers } from "@/hooks/use-customers";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import SearchItemBox from "@/components/search-item-box";
import CashierCheckoutForm from "@/components/cashier-checkout-form";

export default function Cashier() {
  const { auth } = useAuth();
  const { products, mutate } = useProducts(auth.accessToken);
  const { members, loading } = useCustomers(auth.accessToken);

  const [selectedItems, setSelectedItems] = useState<any>([]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const handleDeleteItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item: any) => item.id !== id));
  };

  const handleIncrease = (id: string) => {
    // check if the quantity is more than the stock
    const product = products?.find((product) => product.id === id);
    const stocks = product?.stock || 1;
    if (selectedItems.find((item: any) => item.id === id).quantity >= stocks)
      return;

    setSelectedItems((prevItems: any) => {
      const updatedItems = prevItems.map((prevItem: any) => {
        if (prevItem.id === id) {
          return { ...prevItem, quantity: prevItem.quantity + 1 };
        } else {
          return prevItem;
        }
      });
      return updatedItems;
    });
  };

  const handleDecrease = (id: string) => {
    // if the quantity is 1 then remove the item from the selectedItems array
    if (selectedItems.find((item: any) => item.id === id).quantity === 1) {
      setSelectedItems(selectedItems.filter((item: any) => item.id !== id));
      return;
    }
    setSelectedItems((prevItems: any) => {
      const updatedItems = prevItems.map((prevItem: any) => {
        if (prevItem.id === id) {
          return { ...prevItem, quantity: prevItem.quantity - 1 };
        } else {
          return prevItem;
        }
      });
      return updatedItems;
    });
  };

  return (
    <>
      <div className="flex mt-4 lg:flex-row flex-col">
        <div className="">
          <div className="mr-4">
            {products && (
              <SearchItemBox
                items={products}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            )}
            <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-rounded-lg overflow-x-auto">
              <table className="mt-4 table-auto border-collapse rounded-md w-full">
                <thead>
                  <tr className="bg-[#f1f5f9] text-gray-700 text-sm font-bold rounded-md">
                    <th className="px-4 py-2 border min-w-[7rem]">Nama</th>
                    <th className="px-4 py-2 border min-w-[9rem]">Jumlah</th>
                    <th className="px-4 py-2 border min-w-[8rem]">Harga</th>
                    <th className="px-4 py-2 border min-w-[10rem]">Total</th>
                    <th className="px-4 py-2 border min-w-[5.5rem]"></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.length < 1 ? (
                    <tr>
                      <td className="border" colSpan={6}>
                        <p className="text-center py-4">
                          Belum ada produk yang dipilih
                        </p>
                      </td>
                    </tr>
                  ) : (
                    selectedItems.map((item: any) => (
                      <tr key={item.id} className="text-gray-700">
                        <td className="px-4 py-2 border w-[7rem] whitespace-normal break-words">
                          {item.name}
                        </td>
                        <td className="px-4 py-2 border">
                          <div className="flex justify-between items-center gap-2">
                            <button
                              className="py-1 px-2 border border-gray-400 hover:bg-gray-200 rounded-md"
                              onClick={() => handleDecrease(item.id)}
                            >
                              -
                            </button>
                            <span>
                              <input
                                type="number"
                                className="w-[4rem] text-center rounded-md text-sm focus:outline-none bg-[#fcf4db] font-semibold text-[#ff8a00] py-1"
                                value={item.quantity}
                                min={1}
                                max={item.stock}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  setSelectedItems((prevItems: any) => {
                                    const updatedItems = prevItems.map(
                                      (prevItem: any) => {
                                        if (prevItem.id === item.id) {
                                          return {
                                            ...prevItem,
                                            quantity: value,
                                          };
                                        }
                                        return prevItem;
                                      }
                                    );
                                    return updatedItems;
                                  });
                                }}
                                onBlur={(e) => {
                                  if (
                                    e.target.value === "" ||
                                    parseInt(e.target.value) < 1
                                  ) {
                                    const value = 1;
                                    setSelectedItems(
                                      selectedItems.map((selectedItem: any) => {
                                        if (selectedItem.id === item.id) {
                                          return {
                                            ...selectedItem,
                                            quantity: value,
                                          };
                                        }
                                        return selectedItem;
                                      })
                                    );
                                  } else if (
                                    parseInt(e.target.value) > item.stock
                                  ) {
                                    const value = item.stock;
                                    setSelectedItems(
                                      selectedItems.map((selectedItem: any) => {
                                        if (selectedItem.id === item.id) {
                                          return {
                                            ...selectedItem,
                                            quantity: value,
                                          };
                                        }
                                        return selectedItem;
                                      })
                                    );
                                  }
                                }}
                              />
                            </span>
                            <button
                              className="py-1 px-2 border border-gray-400 hover:bg-gray-200 rounded-md"
                              onClick={() => handleIncrease(item.id)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-2 border">
                          {formatter.format(item.price)}
                        </td>
                        <td className="px-4 py-2 border">
                          {formatter.format(item.price * item.quantity)}
                        </td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="py-1 px-2 rounded-md bg-[#fbdddd] text-[#e96c6c] hover:bg-[#e96c6c] hover:text-[#fbdddd] text-sm font-semibold"
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full md:px-0 ">
          {loading || !members ? (
            "loading"
          ) : (
            <CashierCheckoutForm
              members={members}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              mutate={mutate}
              auth={auth}
            />
          )}
        </div>
      </div>
    </>
  );
}
