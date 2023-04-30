import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

interface TableNavProps {
  canNextPage: boolean;
  canPreviousPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  pageIndex: number;
  pageOptions: any;
}

export default function TableNav({
  canNextPage,
  canPreviousPage,
  nextPage,
  previousPage,
  pageIndex,
  pageOptions,
}: TableNavProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="w-full items-center gap-2">
        <span className="text-sm">
          Halaman{" "}
          <strong>
            {pageIndex + 1} dari {pageOptions.length}
          </strong>
        </span>
        <div className="float-right flex gap-2">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`text-sm font-semibold flex items-center gap-2 border-2 transition-colors duration-150 rounded-[0.250rem]
          ${
            !canPreviousPage
              ? "border-gray-300 text-slate-600"
              : "border-[#16161a] hover:bg-[#16161a] hover:text-white"
          }
        px-2 py-1`}
          >
            <span>
              <AiFillCaretLeft />
            </span>{" "}
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`text-sm font-semibold flex items-center gap-2 border-2 transition-colors duration-150 rounded-[0.250rem]
        ${
          !canNextPage
            ? "border-gray-300 text-slate-600"
            : "border-[#16161a] hover:bg-[#16161a] hover:text-white"
        }
      px-2 py-1`}
          >
            Next{" "}
            <span>
              <AiFillCaretRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
