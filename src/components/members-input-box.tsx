// import { useState } from "react";
// import type { Customer } from "@/types";

// interface Props {
//   members: Customer[];
//   selectedMembers: Customer[];
//   setSelectedMembers: React.Dispatch<React.SetStateAction<Customer[]>>;
// }

// export default function SearchItemBox({
//   members,
//   selectedMembers,
//   setSelectedMembers,
// }: Props) {
//   const [query, setQuery] = useState("");
//   const [isFocused, setIsFocused] = useState(false);
//   const [memberSelected, setMemberSelected] = useState(false);

//   const filteredItems = members.filter(
//     (member: Customer) =>
//       member.name.toLowerCase().includes(query.toLowerCase())
//   );

//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = () => {
//     setTimeout(() => {
//       setIsFocused(false);
//     }, 100);
//   };

//   const handleSelectItem = (member: Customer) => {
//     setMemberSelected(true);
//     // if the selected item doesnt exist in the selectedItems array then add it and set the quantity to 1
//     setSelectedMembers((prev) => {
//       const exist = prev.find((m) => m.id === member.id);
//       if (exist) {
//         return prev.map((x: any) =>
//           x.id === item.id ? { ...exist, quantity: exist.quantity + 1 } : x
//         );
//       } else {
//         return [...prev, { ...item, quantity: 1 }];
//       }
//     });
//     setQuery("");
//   };

//   const handleKeyDown = (event: any) => {
//     if (event.key === "Enter" && filteredItems.length > 0) {
//       handleSelectItem(filteredItems[0]);
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center gap-2 w-full border rounded-3xl px-4 py-3 bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-400 focus-within:text-black transition-colors duration-150">
//         <input
//           type="text"
//           value={query}
//           onChange={(event) => setQuery(event.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Cari produk"
//           className="w-full outline-none bg-transparent"
//           onFocus={handleFocus}
//           onBlur={handleBlur}
//         />
//       </div>
//       {isFocused && (
//         <ul className="max-h-[30rem] overflow-auto absolute z-10 shadow bg-white border-2 rounded-md w-64 mt-2 p-2">
//           {filteredItems.length < 1 ? (
//             <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer" />
//           ) : (
//             filteredItems.map((item: any) => (
//               <li
//                 key={item.id}
//                 className="px-4 flex py-2 justify-between hover:bg-gray-200 cursor-pointer rounded"
//                 onClick={() => handleSelectItem(item)}
//               >
//                 {item.name}
//                 <span
//                   className={`py-1 px-2 text-sm font-semibold rounded-md ${
//                     item.stock
//                       ? "bg-[#fcf4db] text-[#ff8a00]"
//                       : "bg-[#fbdddd] text-[#e96c6c]"
//                   }`}
//                 >
//                   {item.stock}
//                 </span>
//               </li>
//             ))
//           )}
//         </ul>
//       )}
//     </div>
//   );
// }
