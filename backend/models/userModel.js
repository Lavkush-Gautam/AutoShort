// models/User.js
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  planName: { type: String, required: true }, // e.g., "STARTER", "PRO"
  planType: { type: String, enum: ["monthly", "yearly"], required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "expired"], default: "active" },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // Subscription info
    subscription: {
      type: subscriptionSchema,
      default: null,
    },

    // Track plan usage
    videosGenerated: { type: Number, default: 0 },

    // Optional user settings
    settings: {
      voiceType: { type: String, default: "default" },
      backgroundMusic: { type: Boolean, default: true },
    },

    // For soft delete or suspension
    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
