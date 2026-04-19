import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    API.get("/campaign/my-campaigns")
      .then(res => setCampaigns(res.data))
      .catch(err => console.log(err));

    API.get("/campaign/my-donations")
      .then(res => setDonations(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Dashboard</h1>

      {/* MY CAMPAIGNS */}
      <h2>My Campaigns</h2>
      {campaigns.length === 0 ? <p>No campaigns</p> :
        campaigns.map(c => (
          <div key={c._id}>
            <p>{c.title} — ₹{c.raisedAmount}</p>
          </div>
        ))
      }

      {/* MY DONATIONS */}
      <h2>My Donations</h2>
      {donations.length === 0 ? <p>No donations</p> :
        donations.map((d, i) => (
          <div key={i}>
            <p>
              ₹{d.amount} → {d.campaignTitle} (
              {new Date(d.date).toLocaleDateString()})
            </p>
          </div>
        ))
      }
    </div>
  );
}