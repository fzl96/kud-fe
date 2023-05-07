import { useState, useMemo } from "react";
import PageTitle from "../components/pageTitle";
import useSWR from "swr";
import {
  getProducts,
  getProduct,
  productsApiEndpoint,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
} from "../api/productsApi";
import { getCategories, categoriesApiEndpoint } from "../api/categoriesApi";
import { productsHeader } from "../data/tableHeader";
import TableLoader from "../components/tableLoader";
import { productsColumn as columns } from "../data/tableColumns";
import Table from "../components/table";
import Drawer from "../components/drawer";
import Form from "../components/createForm";
import { createProductsField } from "../data/formFields";
import UpdateForm from "../components/updateForm";
import { useAuth } from "../context/authContext";

export default function Products() {
  const { auth } = useAuth();
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR(productsApiEndpoint, () => getProducts(auth.accessToken));

  console.log(data);

  const [open, setOpen] = useState(false);
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState<null | {}>(null);
  const options = useMemo(() => {
    if (data?.categories) {
      return data.categories.map((category: any) => ({
        label: category.name,
        value: category.id,
      }));
    }
  }, [data]);

  const onClose = () => {
    setOpen(false);
    setUpdateDrawerOpen(false);
    setRowSelected(null);
  };

  return (
    <>
      <PageTitle title="Produk" setOpen={setOpen} loading={loading} />
      <div>
        {(loading && !data) || error ? (
          <TableLoader header={productsHeader} />
        ) : (
          <>
            {" "}
            <Table
              columns={columns}
              data={data.products}
              mutate={mutate}
              deleteFunction={deleteProducts}
              setUpdateDrawerOpen={setUpdateDrawerOpen}
              setRowSelected={setRowSelected}
              onClose={onClose}
            />{" "}
            <Drawer open={open} onClose={() => setOpen(false)}>
              {loading ? (
                "Loading"
              ) : (
                <Form
                  mutate={mutate}
                  createFunction={createProduct}
                  fields={createProductsField(options)}
                  onClose={onClose}
                />
              )}
            </Drawer>
            <Drawer open={updateDrawerOpen} onClose={onClose}>
              {!rowSelected || loading ? (
                <></>
              ) : (
                <UpdateForm
                  mutate={mutate}
                  updateFunction={updateProduct}
                  getSingleData={getProduct}
                  cacheKey={productsApiEndpoint}
                  fields={createProductsField(options)}
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
