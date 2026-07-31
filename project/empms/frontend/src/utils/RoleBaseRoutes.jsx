import React from "react";
import { useAuth } from "../context/authContext";

function RoleBaseRoutes() {
  const { user, loading } = useAuth();
  return <div>RoleBaseRoutes</div>;
}

export default RoleBaseRoutes;
