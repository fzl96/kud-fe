import { useState } from "react";
import { FiSearch } from "react-icons/fi";

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
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [itemSelected, setItemSelected] = useState(false);

  const filteredItems = items.filter(
    (item: any) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.id.toString().includes(query)
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
      handleSelectItem(filteredItems[0]);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 w-full border rounded-3xl px-4 py-3 bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-400 focus-within:text-black transition-colors duration-150">
        <FiSearch />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Cari produk"
          className="w-full outline-none bg-transparent"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {isFocused && (
        <ul className="absolute z-10 shadow bg-white border-2 rounded-md w-64 mt-2 p-2">
          {filteredItems.length < 1 ? (
            <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer" />
          ) : (
            filteredItems.map((item: any) => (
              <li
                key={item.id}
                className="px-4 flex py-2 justify-between hover:bg-gray-200 cursor-pointer rounded"
                onClick={() => handleSelectItem(item)}
              >
                {item.name}
                <span>{item.stock}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
