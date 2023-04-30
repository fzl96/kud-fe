import type { TableHeader } from "data/tableHeader";
import Skeleton from "react-loading-skeleton";
import { MoonLoader } from "react-spinners";
import GlobalFilter from "./GlobalFilter";

interface TableLoaderProps {
  header: TableHeader[];
}

export default function TableLoader({ header }: TableLoaderProps) {
  return (
    <div>
      <div className="mx-5 md:mx-10 my-6">
        <GlobalFilter />
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-7 w-10 py-4 text-left rounded-sm border-b-[1.5px] border-slate-300 border-opacity-75 text-xs font-bold text-gray-500 uppercase tracking-wider transition-colors duration-150">
              <div className="flex items-center justify-center w-5 h-5">
                <MoonLoader size={15} />
              </div>
            </th>
            {header.map((item, index) => (
              <th
                key={index}
                className={`px-6 py-4 text-left rounded-sm border-b-[1.5px] border-slate-300 border-opacity-75 text-xs font-bold text-gray-300 uppercase tracking-wider transition-colors duration-150 `}
              >
                <div className="flex gap-2 items-center">
                  <span className="truncate">{item.icon}</span>
                  <span className="truncate">{item.title}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-[1.5px] border-slate-300 border-opacity-75 ">
            <td colSpan={99} className="p-5">
              <Skeleton
                className="h-3 rounded-3xl"
                baseColor="#eaeef1"
                highlightColor="#f7f8fa"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
