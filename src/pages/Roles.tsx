import PageTitle from "../components/pageTitle";
import { createRolesField } from "../data/formFields";
import TableLoader from "../components/tableLoader";
import useSWR from "swr";
import { rolesHeader } from "../data/tableHeader";
import {
  getRoles,
  getRole,
  rolesApiEndpoint,
  createRole,
  updateRole,
  deleteRole,
  deleteRoles,
} from "../api/rolesApi";
import Form from "../components/createForm";
import UpdateForm from "../components/updateForm";
import { rolesColumn as columns } from "../data/tableColumns";
import Table from "../components/table";
import Drawer from "../components/drawer";
import { useState, useMemo } from "react";
import { SidebarData } from "../data/sidebarNav";

export default function Roles() {
  const {
    data,
    error,
    mutate,
    isLoading: loading,
  } = useSWR(rolesApiEndpoint, getRoles);
  const [open, setOpen] = useState(false);
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState<null | {}>(null);
  const options = useMemo(() => {
    return SidebarData.filter((item) => item.value !== "settings").map(
      (item) => {
        return {
          label: item.name,
          value: item.value,
        };
      }
    );
  }, [SidebarData]);
  const onClose = () => {
    setOpen(false);
    setUpdateDrawerOpen(false);
    setRowSelected(null);
  };

  return (
    <>
      <PageTitle title="Roles" setOpen={setOpen} loading={loading} />
      <div>
        {loading ? (
          <TableLoader header={rolesHeader} />
        ) : (
          <Table
            columns={columns}
            data={data}
            mutate={mutate}
            deleteFunction={deleteRoles}
            setRowSelected={setRowSelected}
            setUpdateDrawerOpen={setUpdateDrawerOpen}
            onClose={onClose}
          />
        )}
      </div>
      <Drawer open={open} onClose={onClose}>
        {options && (
          <Form
            fields={createRolesField(options)}
            createFunction={createRole}
            mutate={mutate}
            onClose={onClose}
          />
        )}
      </Drawer>
      <Drawer open={updateDrawerOpen} onClose={onClose}>
        {rowSelected && (
          <UpdateForm
            fields={createRolesField(options)}
            cacheKey={rolesApiEndpoint}
            getSingleData={getRole}
            updateFunction={updateRole}
            mutate={mutate}
            onClose={onClose}
            rowSelected={rowSelected}
          />
        )}
      </Drawer>
    </>
  );
}
