import React from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../common/PageHeader";

function RoleList() {
  return (
    <>
      <PageHeader
        title="User Roles"
        subtitle="Manage application users and their access."
        breadcrumbs={[{ label: "Masters", path: "/" }, { label: "User Roles" }]}
        actionLabel="Add Roles"
        actionTo="/roles/add"
        icon={FaPlus}
      />

      {/* DataTable */}
    </>
  );
}

export default RoleList;
