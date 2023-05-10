import useSWR from "swr";
import { suppliersHeader } from "../data/tableHeader";
import { getSuppliers, suppliersApiEndpoint } from "../api/suppliersApi";
import { getProducts, productsApiEndpoint } from "../api/productsApi";
import {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
  deletePurchases,
  purchasesApiEndpoint,
} from "../api/purchasesApi";
import { purchasesHeader } from "../data/tableHeader";
import { purchasesColumn as columns } from "../data/tableColumns";
import Table from "../components/table";
import Drawer from "../components/drawer";
import CreatePurchaseForm from "../components/createPurchaseForm";
import { useState } from "react";
import PageTitle from "../components/pageTitle";
import TableLoader from "../components/tableLoader";
import CreateFormLoader from "../components/createFormLoader";
import UpdatePurchaseForm from "../components/updatePurchaseForm";
import { useAuth } from "../context/authContext";

export default function Purchases() {
  const { auth } = useAuth();
  const { data, error, mutate, isLoading } = useSWR(purchasesApiEndpoint, () =>
    getPurchases(auth.accessToken)
  );
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
      <PageTitle title="Pembelian" setOpen={setOpen} loading={isLoading} />
      <div>
        {!data || error ? (
          <TableLoader header={purchasesHeader} />
        ) : (
          <>
            {" "}
            <Table
              columns={columns}
              data={data.purchases}
              mutate={mutate}
              deleteFunction={deletePurchases}
              setRowSelected={setRowSelected}
              setUpdateDrawerOpen={setUpdateDrawerOpen}
              onClose={onClose}
            />
            <Drawer open={open} onClose={onClose}>
              {!rowSelected && data ? (
                <CreatePurchaseForm
                  mutate={mutate}
                  onClose={onClose}
                  suppliers={data.suppliers}
                  products={data.products}
                  createPurchase={createPurchase}
                />
              ) : (
                <CreateFormLoader number={2} />
              )}
            </Drawer>
            <Drawer open={updateDrawerOpen} onClose={onClose}>
              {rowSelected && data ? (
                <UpdatePurchaseForm
                  mutate={mutate}
                  onClose={onClose}
                  rowSelected={rowSelected}
                  products={data.products}
                  suppliers={data.suppliers}
                />
              ) : (
                <></>
              )}
            </Drawer>
          </>
        )}
      </div>
    </>
  );
}
