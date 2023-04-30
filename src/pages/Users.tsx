import PageTitle from "../components/pageTitle";
import { createUsersField, updateUsersField } from "../data/formFields";
import TableLoader from "../components/tableLoader";
import useSWR from "swr";
import { usersHeader } from "../data/tableHeader";
import {
  getUsers,
  getUser,
  usersApiEndpoint,
  createUser,
  updateUser,
  deleteUser,
  deleteUsers,
} from "../api/usersApi";
import { getRoles, rolesApiEndpoint } from "../api/rolesApi";
import Form from "../components/createForm";
import UpdateForm from "../components/updateForm";
import { usersColumn as columns } from "../data/tableColumns";
import Table from "../components/table";
import Drawer from "../components/drawer";
import { useState, useMemo } from "react";

export default function Users() {
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR(usersApiEndpoint, getUsers);
  const {
    data: roles,
    isLoading: rolesLoading,
    error: rolesError,
  } = useSWR(rolesApiEndpoint, getRoles);
  const [open, setOpen] = useState(false);
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState<null | {}>(null);
  const options = useMemo(() => {
    return roles?.map((item: { name: string; id: string }) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  }, [roles]);
  const onClose = () => {
    setOpen(false);
    setUpdateDrawerOpen(false);
    setRowSelected(null);
  };

  return (
    <>
      <PageTitle title="User" setOpen={setOpen} loading={loading} />
      <div>
        {loading ? (
          <TableLoader header={usersHeader} />
        ) : (
          <Table
            columns={columns}
            data={data}
            mutate={mutate}
            deleteFunction={deleteUsers}
            setRowSelected={setRowSelected}
            setUpdateDrawerOpen={setUpdateDrawerOpen}
            onClose={onClose}
          />
        )}
      </div>
      <Drawer open={open} onClose={onClose}>
        {options && (
          <Form
            fields={createUsersField(options)}
            createFunction={createUser}
            mutate={mutate}
            onClose={onClose}
          />
        )}
      </Drawer>
      <Drawer open={updateDrawerOpen} onClose={onClose}>
        {rowSelected && (
          <UpdateForm
            fields={updateUsersField(options)}
            updateFunction={updateUser}
            getSingleData={getUser}
            cacheKey={usersApiEndpoint}
            rowSelected={rowSelected}
            mutate={mutate}
            onClose={onClose}
          />
        )}
      </Drawer>
    </>
  );
}
