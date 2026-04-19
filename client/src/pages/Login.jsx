import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      // 🔥 STORE TOKEN
      localStorage.setItem("token", res.data.token);

      // 🔥 STORE USER
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful 🎉");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>Welcome Back</h1>

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

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <p style={{ marginTop: "10px" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#f97316", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}