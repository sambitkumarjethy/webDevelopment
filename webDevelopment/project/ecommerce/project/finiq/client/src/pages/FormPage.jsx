import React from "react";
import SIPForm from "../components/SIPForm";

export default function FormPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#e5e7eb",
      }}
    >
      <SIPForm />
    </div>
  );
}
