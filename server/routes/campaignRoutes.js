const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");
const { protect } = require("../middleware/auth");


// ===============================
// ✅ PUT THESE FIRST
// ===============================

// 🔥 My Campaigns
router.get("/my-campaigns", protect, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ createdBy: req.user.id });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 🔥 My Donations
router.get("/my-donations", protect, async (req, res) => {
  try {
    const campaigns = await Campaign.find({
      "donations.user": req.user.name
    });

    let donations = [];

    campaigns.forEach(c => {
      c.donations.forEach(d => {
        if (d.user === req.user.name) {
          donations.push({
            campaign: c.title,
            amount: d.amount,
            date: d.date
          });
        }
      });
    });

    res.json(donations);

  } catch (err) {
    res.status(500).json(err);
  }
});


// ===============================
// ✅ NORMAL ROUTES
// ===============================

// Create campaign
router.post("/", protect, async (req, res) => {
  try {
    const campaign = await Campaign.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.json(campaign);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all
router.get("/", async (req, res) => {
  const campaigns = await Campaign.find();
  res.json(campaigns);
});

// Donate
router.post("/donate/:id", async (req, res) => {
  try {
    const { amount } = req.body;

    const campaign = await Campaign.findById(req.params.id);

    campaign.donations.push({
      amount: Number(amount),
      user: req.user?.name || "Anonymous"
    });

    campaign.raisedAmount += Number(amount);

    await campaign.save();

    res.json({ message: "Donation successful" });

  } catch (err) {
    console.log("DONATION ERROR:", err);
    res.status(500).json({ message: "Donation failed" });
  }
});


// ===============================
// ❗ KEEP THIS LAST ALWAYS
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    res.json(campaign);
  } catch (err) {
    console.log("GET ONE ERROR:", err.message);
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;