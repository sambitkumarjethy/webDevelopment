import { Routes, Route } from "react-router-dom";
import Notfound from "../components/pages/Notfound";
import Dashboard from "../components/pages/Dashboard";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="users" element={<div>Users</div>} />

        <Route path="roles" element={<div>Roles</div>} />

        <Route path="permissions" element={<div>Permissions</div>} />

        <Route path="applications" element={<div>Applications</div>} />

        {/* 404 */}
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
}
