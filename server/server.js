require("dotenv").config({ path: __dirname + "/.env" }); // 🔥 FIXED dotenv loading

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// 🔥 DEBUG (check env working)
console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);

// ✅ Routes
app.use("/api/campaign", require("./routes/campaignRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Server
app.listen(5000, () => console.log("Server running on port 5000"));