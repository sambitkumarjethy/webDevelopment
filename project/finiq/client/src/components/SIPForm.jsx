import React, { useState } from "react";

export default function SIPForm() {
  const [form, setForm] = useState({
    year: "",
    month: "",
    workingDays: "",
    sipAmount: "",
  });

  const years = [2024, 2025, 2026, 2027, 2028];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Year: ${form.year}\nMonth: ${form.month}\nWorking Days: ${form.workingDays}\nSIP Amount: ₹${form.sipAmount}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        width: "360px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "1rem", color: "#1f2937" }}
      >
        SIP Form
      </h2>

      <label>Year:</label>
      <select name="year" value={form.year} onChange={handleChange} required>
        <option value="">Select Year</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <label>Month:</label>
      <select name="month" value={form.month} onChange={handleChange} required>
        <option value="">Select Month</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <label>Working Days:</label>
      <input
        type="number"
        name="workingDays"
        placeholder="Enter working days"
        value={form.workingDays}
        onChange={handleChange}
        required
      />

      <label>SIP Amount (₹):</label>
      <input
        type="number"
        name="sipAmount"
        placeholder="Enter SIP amount"
        value={form.sipAmount}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        style={{
          padding: "0.6rem",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Submit
      </button>
    </form>
  );
}
