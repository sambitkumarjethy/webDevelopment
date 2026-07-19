import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
      <Route path="/employee-dashboard" element={<EmployeeDashboard />}></Route>
    </Routes>
  );
}

export default App;
