import useSWR from "swr";
import { useState } from "react";
import { salesHeader } from "../data/tableHeader";
import {
  getSales,
  getSale,
  deleteSales,
  salesApiEndpoint,
} from "../api/salesApi";
import Table from "../components/table";
import { salesColumn as columns } from "../data/tableColumns";
import TableLoader from "../components/tableLoader";
import Drawer from "../components/drawer";
import SalesForm from "../components/salesForm";

export default function Sales() {
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR(salesApiEndpoint, getSales);
  const [rowSelected, setRowSelected] = useState<null | {}>(null);
  const [open, setOpen] = useState(false);
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
    setUpdateDrawerOpen(false);
    setRowSelected(null);
  };

  return (
    <>
      <div className="flex justify-between mx-5 md:mx-10 items-center">
        <h1 className="text-xl">Sales</h1>
      </div>
      <div>
        {loading ? (
          <TableLoader header={salesHeader} />
        ) : (
          <Table
            columns={columns}
            data={data}
            mutate={mutate}
            deleteFunction={deleteSales}
            setRowSelected={setRowSelected}
            setUpdateDrawerOpen={setOpen}
            onClose={onClose}
          />
        )}
      </div>
      <Drawer open={open} onClose={onClose}>
        {rowSelected && (
          <SalesForm rowSelected={rowSelected} onClose={onClose} />
        )}
      </Drawer>
    </>
  );
}
