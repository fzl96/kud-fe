import { useState } from "react";
import Table from "../components/table";
import { categoriesColumn as columns } from "../data/tableColumns";
import Drawer from "../components/drawer";
import useSWR from "swr";
import TableLoader from "../components/tableLoader";
import { categoriesHeader } from "../data/tableHeader";
import {
  getCategories,
  getCategory,
  categoriesApiEndpoint,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
} from "../api/categoriesApi";
import Form from "../components/createForm";
import { categoriesField } from "../data/formFields";
import PageTitle from "../components/pageTitle";
import UpdateForm from "../components/updateForm";

export default function Categories() {
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR(categoriesApiEndpoint, getCategories, {
    onSuccess: (data) => data.sort((a: any, b: any) => b.name - a.name),
    revalidateOnMount: true,
  });
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
      <PageTitle title="Kategori" setOpen={setOpen} loading={loading} />
      <div>
        {loading ? (
          <TableLoader header={categoriesHeader} />
        ) : (
          <Table
            columns={columns}
            data={data}
            mutate={mutate}
            deleteFunction={deleteCategories}
            setRowSelected={setRowSelected}
            setUpdateDrawerOpen={setUpdateDrawerOpen}
            onClose={onClose}
          />
        )}
      </div>
      <Drawer open={open} onClose={onClose}>
        <Form
          mutate={mutate}
          onClose={onClose}
          fields={categoriesField}
          createFunction={createCategory}
        />
      </Drawer>
      <Drawer open={updateDrawerOpen} onClose={onClose}>
        {!rowSelected ? (
          ""
        ) : (
          <UpdateForm
            mutate={mutate}
            updateFunction={updateCategory}
            rowSelected={rowSelected}
            onClose={onClose}
            cacheKey={categoriesApiEndpoint}
            getSingleData={getCategory}
            fields={categoriesField}
          />
        )}
      </Drawer>
    </>
  );
}
