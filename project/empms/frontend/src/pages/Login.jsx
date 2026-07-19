import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { email, password } = formData;
    try {
      const response = await axios.post("http://localhost:300/api/auth/login", {
        email,
        password,
      });
      console.log(response);
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      setError(
        error.response?.data?.error ||
          "Something went wrong. Please try again.",
      );
    }
  };
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        <h1
          className="text-3xl font-bold text-center text-emerald-400"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Employee Management System
        </h1>

        <p className="text-center text-slate-300 mt-2 mb-8">
          Login to your account
        </p>
        {error && <p className="text-red-500">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-200 mb-2">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-slate-200 mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" className="accent-emerald-500" />
              Remember Me
            </label>

            <a href="#" className="text-emerald-400 hover:text-emerald-300">
              Forgot Password?
            </a>
          </div>

          <button
            className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all duration-300"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
