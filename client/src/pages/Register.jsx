import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);

      alert("Registered successfully 🎉");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Create Account</h1>

        <input
          className="auth-input"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          className="auth-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="auth-btn" onClick={handleRegister}>
          Register
        </button>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#f97316", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}