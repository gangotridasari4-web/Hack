import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Admin() {
  const [campaigns, setCampaigns] = useState([]);

  // 🔥 Fetch pending campaigns
  const fetchPending = async () => {
    try {
      const res = await API.get("/campaign/admin/pending");
      setCampaigns(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // ✅ APPROVE
  const handleApprove = async (id) => {
    try {
      await API.put(`/campaign/admin/approve/${id}`);
      fetchPending(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ REJECT
  const handleReject = async (id) => {
    try {
      await API.put(`/campaign/admin/reject/${id}`);
      fetchPending();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      {campaigns.length === 0 && <p>No pending campaigns</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {campaigns.map(c => (
          <div key={c._id} style={{
            width: "300px",
            padding: "20px",
            background: "#f1f5f9",
            borderRadius: "10px"
          }}>
            <img
              src={c.image || "https://via.placeholder.com/300x180"}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />

            <h3>{c.title}</h3>
            <p>{c.description}</p>

            <button
              onClick={() => handleApprove(c._id)}
              style={{
                background: "green",
                color: "white",
                marginRight: "10px",
                padding: "5px 10px",
                border: "none"
              }}
            >
              Approve
            </button>

            <button
              onClick={() => handleReject(c._id)}
              style={{
                background: "red",
                color: "white",
                padding: "5px 10px",
                border: "none"
              }}
            >
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}