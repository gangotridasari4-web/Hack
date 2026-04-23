import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const campRes = await API.get("/campaign/my-campaigns");
      const donRes = await API.get("/campaign/my-donations");

      setCampaigns(campRes.data);
      setDonations(donRes.data);

    } catch (err) {
      console.log("Dashboard error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>📊 Dashboard</h1>

      {/* 🔥 My Campaigns */}
      <h2>My Campaigns</h2>

      {campaigns.length === 0 ? (
        <p>No campaigns created</p>
      ) : (
        campaigns.map(c => (
          <div key={c._id} style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0"
          }}>
            <h3>{c.title}</h3>
            <p>₹ {c.raisedAmount} / {c.goalAmount}</p>
          </div>
        ))
      )}

      {/* 💰 My Donations */}
      <h2>My Donations</h2>

      {donations.length === 0 ? (
        <p>No donations yet</p>
      ) : (
        donations.map((d, i) => (
          <div key={i} style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0"
          }}>
            <p><b>{d.campaign}</b></p>
            <p>Amount: ₹ {d.amount}</p>
            <p>Date: {new Date(d.date).toLocaleString()}</p>
          </div>
        ))
      )}

    </div>
  );
}