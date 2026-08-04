import { Routes, Route } from "react-router-dom";
import Notfound from "../components/pages/Notfound";
import Dashboard from "../components/pages/Dashboard";
import MainLayout from "../layouts/MainLayout";
import UserList from "../components/pages/UserList";
import RoleList from "../components/pages/RoleList";
import AuditLogs from "../components/pages/AuditLogs";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="users" element={<UserList />} />

        <Route path="roles" element={<RoleList />} />

        <Route path="auditlogs" element={<AuditLogs />} />

        <Route path="applications" element={<div>Applications</div>} />

        {/* 404 */}
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
}
