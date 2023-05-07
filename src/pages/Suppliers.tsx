import PageTitle from "../components/pageTitle";
import { suppliersField } from "../data/formFields";
import TableLoader from "../components/tableLoader";
import useSWR from "swr";
import { suppliersHeader } from "../data/tableHeader";
import {
  getSuppliers,
  getSupplier,
  suppliersApiEndpoint,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  deleteSuppliers,
} from "../api/suppliersApi";
import Form from "../components/createForm";
import UpdateForm from "../components/updateForm";
import { suppliersColumn as columns } from "../data/tableColumns";
import Table from "../components/table";
import Drawer from "../components/drawer";
import { useState } from "react";
import { useAuth } from "../context/authContext";

export default function Suppliers() {
  const { auth } = useAuth();
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR(suppliersApiEndpoint, () => getSuppliers(auth.accessToken));
  const [open, setOpen] = useState(false);
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState<null | {}>(null);
  const onClose = () => {
    setOpen(false);
    setUpdateDrawerOpen(false);
    setRowSelected(null);
  };

  return (
    <>
      <PageTitle title="Supplier" setOpen={setOpen} loading={loading} />
      <div>
        {loading || error ? (
          <TableLoader header={suppliersHeader} />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              mutate={mutate}
              deleteFunction={deleteSuppliers}
              setRowSelected={setRowSelected}
              setUpdateDrawerOpen={setUpdateDrawerOpen}
              onClose={onClose}
            />
            <Drawer open={open} onClose={onClose}>
              <Form
                fields={suppliersField}
                createFunction={createSupplier}
                mutate={mutate}
                onClose={onClose}
              />
            </Drawer>
            <Drawer open={updateDrawerOpen} onClose={onClose}>
              {rowSelected && (
                <UpdateForm
                  fields={suppliersField}
                  getSingleData={getSupplier}
                  updateFunction={updateSupplier}
                  cacheKey={suppliersApiEndpoint}
                  mutate={mutate}
                  onClose={onClose}
                  rowSelected={rowSelected}
                />
              )}
            </Drawer>
          </>
        )}
      </div>
    </>
  );
}
