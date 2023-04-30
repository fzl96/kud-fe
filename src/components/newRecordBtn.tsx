import { BiPlus } from "react-icons/bi";

interface NewRecordBtnProps {
  text: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export default function NewRecordBtn({
  text,
  setOpen,
  loading,
}: NewRecordBtnProps) {
  return (
    <button
      className={`flex items-center text-white px-4 py-3 text-[0.9063rem] rounded-[0.25rem] bg-[#16161a] font-semibold gap-2 hover:bg-[#2d2d30] transition-colors duration-150 ${
        loading ? "cursor-not-allowed bg-[#2d2d30]" : "cursor-pointer"
      }}`}
      onClick={() => setOpen(true)}
      disabled={loading}
    >
      <span>
        {" "}
        <BiPlus />
      </span>
      {text}
    </button>
  );
}
