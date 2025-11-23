import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planName: { type: String, required: true },
    planType: { type: String, enum: ["monthly", "yearly"], required: true },
    amount: { type: Number, required: true }, // amount in INR (not paise)
    currency: { type: String, default: "INR" },

    // Razorpay details
    orderId: { type: String, required: true }, // Razorpay order ID
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },

    // Current status
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    // Optional: failure reason (e.g. card declined, timeout)
    failureReason: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
