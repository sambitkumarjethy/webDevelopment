import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../common/PageHeader";
import DataGrid from "../common/DataGrid";

function UserList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const users = [];
  const totalRows = 0;
  const loading = false;

  const columns = useMemo(
    () => [
      {
        accessorKey: "employeeId",
        header: "Employee ID",
      },
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ],
    [],
  );

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage application users and their access."
        breadcrumbs={[{ label: "Masters", path: "/" }, { label: "Users" }]}
        actionLabel="Add User"
        actionTo="/users/add"
        icon={FaPlus}
      />

      <DataGrid
        columns={columns}
        data={users}
        loading={loading}
        page={page}
        pageSize={pageSize}
        totalRows={totalRows}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSearch={setSearch}
      />
    </>
  );
}

export default UserList;
