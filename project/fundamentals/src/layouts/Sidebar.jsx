import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `block rounded-lg px-4 py-2 transition ${
      isActive
        ? "bg-emerald-600 text-white"
        : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
    }`;

  return (
    <aside className="w-64 border-r bg-white dark:bg-slate-800 dark:border-slate-700">
      <div className="border-b p-5">
        <h2 className="text-xl font-bold text-emerald-600">IAM Portal</h2>
      </div>

      <nav className="space-y-2 p-4">
        <NavLink to="/" className={menuClass}>
          Dashboard
        </NavLink>

        <p className="mt-4 text-xs font-semibold uppercase text-slate-400">
          Masters
        </p>

        <NavLink to="/users" className={menuClass}>
          Users
        </NavLink>

        <NavLink to="/roles" className={menuClass}>
          Roles
        </NavLink>

        <NavLink to="/auditlogs" className={menuClass}>
          Audit Logs
        </NavLink>

        <NavLink to="/applications" className={menuClass}>
          Applications
        </NavLink>
      </nav>
    </aside>
  );
}
