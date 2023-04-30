import { FiSearch } from "react-icons/fi";

interface Props {
  filter?: string;
  setFilter?: React.Dispatch<React.SetStateAction<string>>;
}

export default function GlobalFilter({ filter, setFilter }: Props) {
  return (
    <div className="flex items-center gap-2 w-full border rounded-3xl px-4 py-3 bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-400 focus-within:text-black transition-colors duration-150">
      <FiSearch />
      <input
        value={filter || ""}
        disabled={!setFilter}
        onChange={setFilter ? (e) => setFilter(e.target.value) : () => {}}
        placeholder={"Search"}
        className="w-full outline-none bg-transparent"
      />
    </div>
  );
}
