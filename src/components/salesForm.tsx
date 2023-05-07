import useSWR from "swr";
import { useState } from "react";
import { getSale, salesApiEndpoint } from "../api/salesApi";
import Skeleton from "react-loading-skeleton";
import { BiKey, BiUser, BiGitBranch } from "react-icons/bi";
import { FiHash } from "react-icons/fi";

interface Props {
  rowSelected: any;
  onClose: () => void;
}

export default function SalesForm({ rowSelected, onClose }: Props) {
  const {
    data,
    error,
    isLoading: loading,
  } = useSWR(`${salesApiEndpoint}/${rowSelected.id}`, () =>
    getSale(rowSelected.id)
  );

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <div>
      <form className="flex flex-col gap-4 mt-5 ml-1">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col px-4 py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 opacity-90">
            <label
              htmlFor="id"
              className="text-sm font-semibold flex items-center gap-2"
            >
              <span>
                <BiKey />
              </span>
              ID
            </label>
            {loading ? (
              <Skeleton
                baseColor="#eaeef1"
                highlightColor="#f7f8fa"
                className="h-[0.35rem] py-0"
              />
            ) : (
              <input
                disabled
                value={rowSelected.id}
                type="text"
                className="bg-transparent outline-none text-sm pt-1"
              />
            )}
          </div>
          <div className="flex flex-col px-4 py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 opacity-90">
            <label
              htmlFor="id"
              className="text-sm font-semibold flex items-center gap-2"
            >
              <span>
                <BiGitBranch />
              </span>
              Pelanggan
            </label>
            {loading ? (
              <Skeleton
                baseColor="#eaeef1"
                highlightColor="#f7f8fa"
                className="h-[0.35rem] py-0"
              />
            ) : (
              <input
                disabled
                value={data.customer?.name}
                type="text"
                className="bg-transparent outline-none text-sm pt-1"
              />
            )}
          </div>
          <div className="flex flex-col py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 max-h-[17rem] opacity-90 ">
            <label
              htmlFor="id"
              className="px-4 text-sm font-semibold flex items-center gap-2"
            >
              <span>
                <BiGitBranch />
              </span>
              Produk
            </label>
            {loading ? (
              <Skeleton
                baseColor="#eaeef1"
                highlightColor="#f7f8fa"
                className="h-[0.35rem] py-0"
              />
            ) : (
              <div className="mt-1 rounded-lg border-white max-h-[10rem] px-2 overflow-auto">
                <table className="table-auto border-separate rounded-lg w-full">
                  <thead className="rounded-lg border-black border-2 bg-white">
                    <tr className="">
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Nama</th>
                      <th className="px-4 py-2">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#d7dde4]">
                    {data.products.map((product: any) => (
                      <tr key={product.id}>
                        <td className="px-4 py-2">{product.id}</td>
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="flex flex-col px-4 py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 opacity-90">
            <label
              htmlFor="id"
              className="text-sm font-semibold flex items-center gap-2"
            >
              <span>
                <FiHash />
              </span>
              Total
            </label>
            {loading ? (
              <Skeleton
                baseColor="#eaeef1"
                highlightColor="#f7f8fa"
                className="h-[0.35rem] py-0"
              />
            ) : (
              <input
                disabled
                value={formatter.format(data.total)}
                type="text"
                className="font-semibold bg-transparent outline-none text-sm pt-1"
              />
            )}
          </div>
          <div className="flex flex-col px-4 py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 opacity-90">
            <label
              htmlFor="id"
              className="text-sm font-semibold flex items-center gap-2"
            >
              <span>
                <FiHash />
              </span>
              Cash
            </label>
            {loading ? (
              <Skeleton
                baseColor="#eaeef1"
                highlightColor="#f7f8fa"
                className="h-[0.35rem] py-0"
              />
            ) : (
              <input
                disabled
                value={formatter.format(data.cash)}
                type="text"
                className="font-semibold bg-transparent outline-none text-sm pt-1"
              />
            )}
          </div>
          <div className="flex flex-col px-4 py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 opacity-90">
            <label
              htmlFor="id"
              className="text-sm font-semibold flex items-center gap-2"
            >
              <span>
                <FiHash />
              </span>
              Kembalian
            </label>
            {loading ? (
              <Skeleton
                baseColor="#eaeef1"
                highlightColor="#f7f8fa"
                className="h-[0.35rem] py-0"
              />
            ) : (
              <input
                disabled
                value={formatter.format(data.change)}
                type="text"
                className="font-semibold bg-transparent outline-none text-sm pt-1"
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
