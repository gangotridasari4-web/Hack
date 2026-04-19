const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

// 🔥 DEBUG (remove later)
console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);

// ✅ INIT RAZORPAY
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// ✅ CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    // 🔍 VALIDATION
    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid amount"
      });
    }

    // 💳 CREATE ORDER
    const options = {
      amount: Number(amount) * 100, // ₹ → paise
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    console.log("RAZORPAY ERROR:", err); // 🔥 important
    res.status(500).json({
      message: "Order creation failed"
    });
  }
});

module.exports = router;