const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  title: String,
  description: String,
  goalAmount: Number,

  raisedAmount: {
    type: Number,
    default: 0
  },

  image: String,
  ngoName: String,
  regNumber: String,

  // ✅ FIXED donations structure
  donations: [
    {
      amount: {
        type: Number,
        required: true
      },
      user: {
        type: String,
        default: "Anonymous"
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  status: {
    type: String,
    default: "approved"
  },

  // ✅ FIXED comma issue here
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Campaign", campaignSchema);