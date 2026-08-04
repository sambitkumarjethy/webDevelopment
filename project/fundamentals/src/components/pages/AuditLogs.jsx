import React from "react";
import { FaPlus } from "react-icons/fa";
import PageHeader from "../common/PageHeader";

function AuditLogs() {
  return (
    <>
      <PageHeader
        title="Audit Logs"
        subtitle="Manage application users and their access."
        breadcrumbs={[{ label: "Masters", path: "/" }, { label: "Audit Logs" }]}
      />

      {/* DataTable */}
    </>
  );
}

export default AuditLogs;
