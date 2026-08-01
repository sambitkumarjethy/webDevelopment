import { NavLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-emerald-600 text-white"
        : "text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
    }`;

  return (
    <nav className="flex items-center justify-between p-4 shadow-md">
      <h2 className="text-xl font-semibold">Identity & Access Management</h2>

      <button
        onClick={toggleTheme}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-emerald-500 hover:text-white dark:bg-slate-800 dark:text-yellow-400"
      >
        {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>
    </nav>
  );
}
