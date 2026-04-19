import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import "./create.css";

export default function CreateCampaign() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    goalAmount: "",
    image: "",
    ngoName: "",
    regNumber: ""
  });

  // 🔐 PROTECT PAGE
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  // ✏️ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 HANDLE SUBMIT
  const handleSubmit = async () => {
    // ✅ VALIDATION
    if (
      !form.title ||
      !form.description ||
      !form.goalAmount ||
      !form.image ||
      !form.ngoName ||
      !form.regNumber
    ) {
      alert("Please fill all fields");
      return;
    }

    if (Number(form.goalAmount) <= 0) {
      alert("Enter valid goal amount");
      return;
    }

    try {
      // 🔥 CORRECT API + NUMBER FIX
      await API.post("/campaign", {
        ...form,
        goalAmount: Number(form.goalAmount)
      });

      alert("Campaign Created 🎉");

      // 🔁 RESET FORM
      setForm({
        title: "",
        description: "",
        goalAmount: "",
        image: "",
        ngoName: "",
        regNumber: ""
      });

      // 🔄 REDIRECT
      navigate("/", { state: { refresh: true } });

    } catch (err) {
      console.log("CREATE ERROR:", err.response || err);

      alert(
        err.response?.data?.message ||
        "Error creating campaign"
      );
    }
  };

  return (
    <div className="create-page">
      <div className="create-card">

        <h1>Create Campaign</h1>

        <input
          className="create-input"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          className="create-input"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          className="create-input"
          name="goalAmount"
          type="number"
          placeholder="Goal Amount"
          value={form.goalAmount}
          onChange={handleChange}
        />

        <input
          className="create-input"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <input
          className="create-input"
          name="ngoName"
          placeholder="NGO Name"
          value={form.ngoName}
          onChange={handleChange}
        />

        <input
          className="create-input"
          name="regNumber"
          placeholder="Registration Number"
          value={form.regNumber}
          onChange={handleChange}
        />

        <button className="create-btn" onClick={handleSubmit}>
          Create Campaign
        </button>

      </div>
    </div>
  );
}