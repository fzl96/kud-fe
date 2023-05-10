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
import { useAuth } from "../context/authContext";

export default function Sales() {
  const { auth } = useAuth();
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR(salesApiEndpoint, () => getSales(auth.accessToken));
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
        <h1 className="text-2xl font-semibold">Sales</h1>
      </div>
      <div>
        {loading || error ? (
          <TableLoader header={salesHeader} />
        ) : (
          <>
            {" "}
            <Table
              columns={columns}
              data={data}
              mutate={mutate}
              deleteFunction={deleteSales}
              setRowSelected={setRowSelected}
              setUpdateDrawerOpen={setOpen}
              onClose={onClose}
            />{" "}
            <Drawer open={open} onClose={onClose}>
              {rowSelected && (
                <SalesForm rowSelected={rowSelected} onClose={onClose} />
              )}
            </Drawer>
          </>
        )}
      </div>
    </>
  );
}
