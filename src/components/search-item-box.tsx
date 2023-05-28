import { useState } from "react";
// import { FiSearch } from "react-icons/fi";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "./ui/input";

interface Props {
  items: any;
  selectedItems: any;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
}

export default function SearchItemBox({
  items,
  selectedItems,
  setSelectedItems,
}: Props) {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [, setItemSelected] = useState(false);

  const filteredItems = items.filter(
    (item: any) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.id.toString().includes(query) ||
      (item.barcode && item.barcode.toString().includes(query))
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  const handleSelectItem = (item: any) => {
    // check if the selected item stock is 0
    if (item.stock === 0) {
      toast({
        title: "Stok habis",
        description: "Stok produk ini sudah habis",
        variant: "destructive",
      });
      return;
    }
    setItemSelected(true);
    // if the selected item doesnt exist in the selectedItems array then add it and set the quantity to 1
    setSelectedItems((prev: any) => {
      const exist = prev.find((x: any) => x.id === item.id);
      if (exist) {
        return prev.map((x: any) =>
          x.id === item.id ? { ...exist, quantity: exist.quantity + 1 } : x
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    setQuery("");
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && filteredItems.length > 0) {
      // check if the filteredItems[0] is already in the selectedItems array
      const exist = selectedItems.find(
        (item: any) => item.id === filteredItems[0].id
      );
      if (!exist) {
        handleSelectItem(filteredItems[0]);
        return;
      }
      if (exist.quantity >= filteredItems[0].stock) {
        toast({
          title: "Stok tidak cukup",
          description: "Stok produk ini tidak mencukupi",
          variant: "destructive",
        });
        return;
      }
      handleSelectItem(filteredItems[0]);
      return;
    }
  };

  return (
    <>
      <Input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Cari produk"
        // className="w-full outline-none bg-transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {/* </div> */}
      {isFocused && (
        <ul className="max-h-[30rem] overflow-auto absolute z-10 shadow bg-white border-2 rounded-md w-64 mt-2 p-2">
          {filteredItems.length < 1 ? (
            <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
              Tidak ada produk
            </div>
          ) : (
            filteredItems.map((item: any) => (
              <li
                key={item.id}
                className="px-4 flex py-2 justify-between hover:bg-gray-200 cursor-pointer rounded"
                onClick={() => handleSelectItem(item)}
              >
                {item.name}
                <span
                  className={`py-1 px-2 text-sm font-semibold rounded-md ${
                    item.stock
                      ? "bg-[#fcf4db] text-[#ff8a00]"
                      : "bg-[#fbdddd] text-[#e96c6c]"
                  }`}
                >
                  {item.stock}
                </span>
              </li>
            ))
          )}
        </ul>
      )}
    </>
  );
}
