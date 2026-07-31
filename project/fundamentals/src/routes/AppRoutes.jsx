import { Routes, Route } from "react-router-dom";
import Notfound from "../components/pages/Notfound";
import Login from "../components/pages/Login";
import Master from "../components/pages/Master";
import Transaction from "../components/pages/Transaction";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/master" element={<Master />} />
      <Route path="/transaction" element={<Transaction />} />

      {/* 404 */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
