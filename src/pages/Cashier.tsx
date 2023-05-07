import NewRecordBtn from "../components/newRecordBtn";
import { getProducts, productsApiEndpoint } from "../api/productsApi";
import { getCustomers, customersApiEndpoint } from "../api/customersApi";
import { getCashier, postCashier, cashierApiEndpoint } from "../api/cashierApi";
import useSWR from "swr";
import { useState } from "react";
import SearchItemBox from "../components/searchItemBox";
import CashierCheckoutForm from "../components/cashierCheckoutForm";
import { useAuth } from "../context/authContext";

export default function Cashier() {
  const { auth } = useAuth();
  const { data, error, isLoading, mutate } = useSWR(cashierApiEndpoint, () =>
    getCashier(auth.accessToken)
  );
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<any>([]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  if (error) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleDeleteItem = (id: string) => {
    setSelectedItems(selectedItems.filter((item: any) => item.id !== id));
  };

  const totalPrice = selectedItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );

  const handleIncrease = (id: string) => {
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
      <div className="flex justify-between mx-5 md:mx-10 items-center">
        <h1 className="text-2xl font-semibold">Kasir</h1>
      </div>
      <div className="flex lg:flex-row flex-col">
        <div className="">
          <div className="p-4">
            {data.products && (
              <SearchItemBox
                items={data.products}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            )}
            <div className="overflow-y-auto scrollbar scrollbar-thumb-gray-200 scrollbar-track-gray-100 scrollbar-rounded-lg overflow-x-auto">
              <table className="mt-4 table-auto border-collapse w-full">
                <thead>
                  <tr className="bg-[#e4e9ec] text-gray-700 text-sm font-bold rounded-md">
                    <th className="px-4 py-2 border min-w-[16rem]">ID</th>
                    <th className="px-4 py-2 border min-w-[7rem]">Name</th>
                    <th className="px-4 py-2 border min-w-[9rem]">Quantity</th>
                    <th className="px-4 py-2 border min-w-[6rem]">Price</th>
                    <th className="px-4 py-2 border min-w-[6rem]">Total</th>
                    <th className="px-4 py-2 border min-w-[5.5rem]">Action</th>
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
                        <td className="px-4 py-2 border">{item.id}</td>
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
                                className="w-10 text-center rounded-md focus:outline-none bg-[#fcf4db] font-semibold text-[#ff8a00] py-1"
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
        <div className="w-full pr-5">
          {isLoading || !data ? (
            "loading"
          ) : (
            <CashierCheckoutForm
              customers={data.customers}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              mutate={mutate}
            />
          )}
        </div>
      </div>
    </>
  );
}
