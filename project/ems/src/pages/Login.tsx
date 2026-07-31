import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let isValid = true;

    const newErrors = {
      email: "",
      password: "",
    };

    // Email Validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Password Validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };
  const validateEmail = (value: string) => {
    setEmail(value);

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const validatePassword = (value: string) => {
    setPassword(value);
    console.log("Password:", value);

    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        password: "Password is required",
      }));
    } else if (value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters",
      }));
    } else if (!/[A-Z]/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must contain at least one uppercase letter",
      }));
    } else if (!/[a-z]/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must contain at least one lowercase letter",
      }));
    } else if (!/\d/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must contain at least one number",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validate();

    if (!isValid) {
      return;
    }

    console.log({
      email,
      password,
    });

    alert("Login Success");

    // API Call Here
    // loginUser({ email, password });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
            placeholder="Enter email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            placeholder="Enter password"
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
