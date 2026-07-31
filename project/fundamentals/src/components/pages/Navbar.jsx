import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-emerald-600 text-white"
        : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
    }`;

  return (
    <nav className="flex gap-4 p-4 shadow-md">
      <NavLink to="/master" className={linkClass}>
        Masters
      </NavLink>

      <NavLink to="/transaction" className={linkClass}>
        Transaction
      </NavLink>
    </nav>
  );
}
