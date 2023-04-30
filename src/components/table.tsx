import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useRowSelect,
  useFlexLayout,
  usePagination,
} from "react-table";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { useMemo, useState } from "react";
import GlobalFilter from "./GlobalFilter";
import { Checkbox } from "./checkbox";
import "react-loading-skeleton/dist/skeleton.css";
import TableNav from "./tableNav";
import TableSelectPopUP from "./tableSelectPopUp";
import { useNavigate } from "react-router-dom";

interface TableProps {
  columns: any;
  data: any;
  deleteFunction: (id: string[]) => Promise<void>;
  mutate: () => void;
  setRowSelected: React.Dispatch<React.SetStateAction<{}>>;
  setUpdateDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

export default function Table({
  columns,
  data,
  deleteFunction,
  mutate,
  setRowSelected,
  setUpdateDrawerOpen,
  onClose,
}: TableProps) {
  const columnsMemo = useMemo(() => columns, [columns]);
  const dataMemo = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    setGlobalFilter,
    selectedFlatRows,
    nextPage,
    previousPage,
    canNextPage,
    pageOptions,
    canPreviousPage,
    toggleAllRowsSelected,
  } = useTable(
    {
      columns: columnsMemo,
      data: dataMemo,
      initialState: {
        pageSize: 7,
        sortBy: [{ id: "updatedAt", desc: true }],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useFlexLayout,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div className="text-center">
                <Checkbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div className=" text-center pt-2">
                <Checkbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
            width: "auto",
          },
          ...columns,
        ];
      });
    }
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <div className="mx-5 md:mx-10 my-6">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`px-6 py-4 text-left rounded-sm border-b-[1.5px] border-slate-300 border-opacity-75 text-xs font-bold text-gray-500 uppercase tracking-wider transition-colors duration-150 ${
                      index === 0 ? "bg-transparent" : "hover:bg-[#e4e9ec]"
                    }`}
                  >
                    <div
                      className={`${
                        index === 0 ? "" : "flex justify-between"
                      } items-center`}
                    >
                      {column.render("Header")}
                      <span className="text-base">
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <BiUpArrowAlt />
                          ) : (
                            <BiDownArrowAlt />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-transparent hover:bg-[#e4e9ec] transition-colors duration-150 cursor-pointer whitespace-normal"
                  onClick={() => {
                    setRowSelected(row.original);
                    setUpdateDrawerOpen(true);
                  }}
                >
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`${
                          index === 0
                            ? "flex items-center justify-center"
                            : "flex items-center"
                        } border-b-[1.5px] border-slate-300 border-opacity-75 px-6 py-2 whitespace-normal text-sm text-gray-900`}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <TableNav
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        nextPage={nextPage}
        previousPage={previousPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
      />
      <TableSelectPopUP
        selectedFlatRows={selectedFlatRows}
        toggleAllRowsSelected={toggleAllRowsSelected}
        deleteFunction={deleteFunction}
        mutate={mutate}
        onClose={onClose}
      />
    </>
  );
}
