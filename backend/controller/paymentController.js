import crypto from "crypto";
import { razorpay } from "../config/razorpay.js";
import Payment from "../models/paymentModel.js";
import User from "../models/userModel.js";
import SubscriptionPlan from "../models/subscription.js";


// ✅ Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const { planId, planType } = req.body;
    const userId = req.user._id; // assuming JWT auth middleware

    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const amount =
      planType === "yearly" ? plan.priceYearly * 100 : plan.priceMonthly * 100;

    const options = {
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      user: userId,
      planName: plan.name,
      planType,
      amount: amount / 100,
      currency: "INR",
      orderId: order.id,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      order,
      paymentId: payment._id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment order creation failed" });
  }
};


// ✅ Verify Razorpay Payment
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;
    const userId = req.user._id;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const payment = await Payment.findByIdAndUpdate(
        paymentId,
        {
          paymentId: razorpay_payment_id,
          status: "success",
        },
        { new: true }
      );

      // Activate subscription for user
      const plan = await SubscriptionPlan.findOne({ name: payment.planName });
      const endDate = new Date();
      if (payment.planType === "monthly") endDate.setMonth(endDate.getMonth() + 1);
      else endDate.setFullYear(endDate.getFullYear() + 1);

      await User.findByIdAndUpdate(userId, {
        subscription: {
          planName: plan.name,
          planType: payment.planType,
          startDate: new Date(),
          endDate,
          status: "active",
        },
      });

      return res.status(200).json({ success: true, message: "Payment verified and subscription activated!" });
    } else {
      await Payment.findByIdAndUpdate(paymentId, { status: "failed" });
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment verification error" });
  }
};
// ✅ Get User Subscription Status
export const getSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });
    const subscription = user.subscription;

    if (!subscription || subscription.status === "expired") {
      return res.status(200).json({ subscribed: false, message: "No active subscription" });
    }
    res.status(200).json({ subscribed: true, subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch subscription status" });
  }
};

export const getPaymentHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const payments = await Payment.find({ user: userId }).sort({ createdAt: -1 });  
        res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch payment history" });
    }
};

export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('user', 'name email').sort({ createdAt: -1 });
        res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch all payments" });
    }
};
export const getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await Payment.findById(paymentId).populate('user', 'name email');
        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.status(200).json({ success: true, payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch payment details" });
    }

};