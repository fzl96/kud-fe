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

export default function Purchases() {
  const {
    data: purchases,
    error: purchasesError,
    mutate: purchasesMutate,
    isLoading: purchasesLoading,
  } = useSWR(purchasesApiEndpoint, getPurchases);
  const { data: products, isLoading: productsLoading } = useSWR(
    productsApiEndpoint,
    getProducts
  );
  const { data: suppliers, isLoading: suppliersLoading } = useSWR(
    suppliersApiEndpoint,
    getSuppliers
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
      <PageTitle
        title="Pembelian"
        setOpen={setOpen}
        loading={purchasesLoading}
      />
      <div>
        {!products || !suppliers || !purchases ? (
          <TableLoader header={purchasesHeader} />
        ) : (
          <Table
            columns={columns}
            data={purchases}
            mutate={purchasesMutate}
            deleteFunction={deletePurchases}
            setRowSelected={setRowSelected}
            setUpdateDrawerOpen={setUpdateDrawerOpen}
            onClose={onClose}
          />
        )}
      </div>
      <Drawer open={open} onClose={onClose}>
        {!rowSelected && products && suppliers ? (
          <CreatePurchaseForm
            mutate={purchasesMutate}
            onClose={onClose}
            suppliers={suppliers}
            products={products}
            createPurchase={createPurchase}
          />
        ) : (
          <CreateFormLoader number={2} />
        )}
      </Drawer>
      <Drawer open={updateDrawerOpen} onClose={onClose}>
        {rowSelected && products && suppliers ? (
          <UpdatePurchaseForm
            mutate={purchasesMutate}
            onClose={onClose}
            rowSelected={rowSelected}
            products={products}
            suppliers={suppliers}
          />
        ) : (
          <></>
        )}
      </Drawer>
    </>
  );
}
