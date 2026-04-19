import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import "./home.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);

  const aboutRef = useRef(null);   // ✅ now used correctly
  const donateRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      const res = await API.get("/campaign");
      setCampaigns(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // 🔄 Refresh after donation
  useEffect(() => {
    if (location.state?.refresh) {
      fetchCampaigns();
    }
  }, [location]);

  return (
    <div>

      {/* 🔥 HERO */}
      <div className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Donate</h1>
          <h2>for a better world</h2>

          <div className="hero-buttons">
            <button
              className="btn-pill"
              onClick={() => navigate(`/donate/${campaigns[0]?._id}`)}
            >
              Donate Now
            </button>

            <button
              className="btn-pill"
              onClick={() =>
                aboutRef.current.scrollIntoView({ behavior: "smooth" })
              }
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* 🌟 FEATURES */}
      <div className="features">
        <div className="feature-card">Volunteer</div>
        <div className="feature-card">Help</div>
        <div className="feature-card">Impact</div>
      </div>

      {/* 🌟 ABOUT / MISSION (FIXED REF) */}
      <div ref={aboutRef} className="about">
        <h2>Make a Difference Today</h2>

        <p>
          Your support has the power to transform lives. By contributing to our
          campaigns, you help provide food, education, and healthcare to those
          in need. Every small act of kindness creates a ripple of positive change
          in our communities.
        </p>

        <p>
          Together, we can build a future where everyone has access to basic
          necessities and opportunities to thrive. Join us in making a lasting impact.
        </p>
      </div>

      {/* 📊 CAMPAIGNS */}
      <div className="campaign-section">
        <h1>Campaigns</h1>

        <div className="campaign-grid">
          {campaigns.map(c => {
            const percent = c.goalAmount
              ? (c.raisedAmount / c.goalAmount) * 100
              : 0;

            return (
              <div key={c._id} className="campaign-card">

                {/* ✅ IMAGE SAFE */}
                <img
                  src={c.image || "https://via.placeholder.com/300x180"}
                  alt="campaign"
                />

                <h3>{c.title}</h3>
                <p>{c.description}</p>

                {/* ✅ PROGRESS */}
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* ✅ DONATE BUTTON */}
                <button
                  className="btn-pill"
                  onClick={() => navigate(`/donate/${c._id}`)}
                >
                  Donate
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔻 FOOTER */}
      <div className="footer">© NGO Platform</div>
    </div>
  );
}