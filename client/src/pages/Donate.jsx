import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./donate.css";

export default function Donate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch campaign
  useEffect(() => {
    API.get(`/campaign/${id}`)
      .then(res => setCampaign(res.data))
      .catch(err => console.log(err));
  }, [id]);

  // ✅ Donate
  const handleDonate = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(`/campaign/donate/${id}`, {
        amount: Number(amount)
      });

      console.log("SUCCESS:", res.data);

      // ✅ Update UI
      setCampaign(prev => ({
        ...prev,
        raisedAmount: prev.raisedAmount + Number(amount),
        donations: [
          ...prev.donations,
          {
            amount: Number(amount),
            date: new Date()
          }
        ]
      }));

      setSuccess(true);

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
      alert("Donation failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Success screen
  if (success) {
    return (
      <div className="donate-page">
        <div className="donate-card">
          <h1 style={{ color: "#16a34a" }}>🎉 Thank You!</h1>
          <p>Your donation made a difference ❤️</p>

          <button
            className="donate-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  const percent = campaign.goalAmount
    ? (campaign.raisedAmount / campaign.goalAmount) * 100
    : 0;

  return (
    <div className="donate-page">
      <div className="donate-card">

        <img
          src={campaign.image || "https://via.placeholder.com/400x200"}
          alt="campaign"
          className="donate-image"
        />

        <h1>{campaign.title}</h1>
        <p>{campaign.description}</p>

        <p>
          ₹ {campaign.raisedAmount} / {campaign.goalAmount}
        </p>

        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${percent}%` }}
          />
        </div>

        <h3>Recent Donations</h3>
        <ul>
          {campaign.donations?.slice(-5).reverse().map((d, i) => (
           <li>
  ₹{d.amount} donated
  <span style={{ marginLeft: "10px", color: "#666" }}>
    {new Date(d.date).toLocaleDateString()}
  </span>
</li>
          ))}
        </ul>

        <div className="quick-amounts">
          <button onClick={() => setAmount(100)}>₹100</button>
          <button onClick={() => setAmount(500)}>₹500</button>
          <button onClick={() => setAmount(1000)}>₹1000</button>
        </div>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="donate-input"
        />

        <button
          className="donate-btn"
          onClick={handleDonate}
          disabled={loading}
        >
          {loading ? "Processing..." : "Donate Now ❤️"}
        </button>

      </div>
    </div>
  );
}