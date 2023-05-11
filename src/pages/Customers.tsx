import PageTitle from "../components/pageTitle";
import { customersField } from "../data/formFields";
import TableLoader from "../components/tableLoader";
import useSWR from "swr";
import { customersHeader } from "../data/tableHeader";
import {
  getCustomers,
  getCustomer,
  customersApiEndpoint,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  deleteCustomers,
} from "../api/customersApi";
import Form from "../components/createForm";
import UpdateForm from "../components/updateForm";
import { customersColumn as columns } from "../data/tableColumns";
import Table from "../components/table";
import Drawer from "../components/drawer";
import { useState } from "react";
import { useAuth } from "../context/authContext";

const Customers = () => {
  const { auth } = useAuth();
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR(customersApiEndpoint, () => getCustomers(auth.accessToken));
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
      <PageTitle title="Customer" setOpen={setOpen} loading={loading} />
      <div>
        {loading || error ? (
          <TableLoader header={customersHeader} />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              mutate={mutate}
              deleteFunction={deleteCustomers}
              setRowSelected={setRowSelected}
              setUpdateDrawerOpen={setUpdateDrawerOpen}
              onClose={onClose}
            />
            <Drawer open={open} onClose={onClose}>
              <Form
                fields={customersField}
                createFunction={createCustomer}
                mutate={mutate}
                onClose={onClose}
              />
            </Drawer>
            <Drawer open={updateDrawerOpen} onClose={onClose}>
              {rowSelected && (
                <UpdateForm
                  fields={customersField}
                  cacheKey={customersApiEndpoint}
                  getSingleData={getCustomer}
                  rowSelected={rowSelected}
                  updateFunction={updateCustomer}
                  mutate={mutate}
                  onClose={onClose}
                />
              )}
            </Drawer>
          </>
        )}
      </div>
    </>
  );
};

export default Customers;
