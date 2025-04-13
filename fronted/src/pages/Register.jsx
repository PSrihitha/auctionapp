import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="register-body">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            name="username"
            placeholder="Username"
            className="register-input"
            value={form.username}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="register-input"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="register-input"
            value={form.password}
            onChange={handleChange}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="register-input"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <button className="register-btn">Create Account</button>
        </form>
        <p className="switch-login">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="link-text">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
