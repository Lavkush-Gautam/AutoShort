import mongoose from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // e.g. "FREE", "STARTER", "DAILY", "HARDCORE"
    priceMonthly: { type: Number, required: true },
    priceYearly: { type: Number, required: true },
    description: { type: String },
    videoLimitPerMonth: { type: Number, required: true }, // e.g., 1, 12, 30, 60
    features: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
