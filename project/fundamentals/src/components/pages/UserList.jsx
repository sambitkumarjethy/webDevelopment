import { FaPlus } from "react-icons/fa";
import PageHeader from "../common/PageHeader";

function UserList() {
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

      {/* DataTable */}
    </>
  );
}

export default UserList;
