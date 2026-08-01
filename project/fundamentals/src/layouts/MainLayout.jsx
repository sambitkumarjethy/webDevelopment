import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "./sidebar";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
