import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../common/PageHeader";
import DataGrid from "../common/DataGrid";

function UserList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState([]);

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
        enableSorting: true,
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

  useEffect(() => {
    const sortField = sorting[0]?.id;
    const sortOrder = sorting[0]?.desc ? "desc" : "asc";

    console.log(sortField, sortOrder);

    // fetchUsers({
    //   page,
    //   pageSize,
    //   search,
    //   sortField,
    //   sortOrder,
    // });
  }, [page, pageSize, search, sorting]);

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
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </>
  );
}

export default UserList;
