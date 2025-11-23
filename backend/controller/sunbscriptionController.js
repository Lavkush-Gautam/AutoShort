import Subscription from "../models/subscription.js";

// ✅ Create a plan (Admin)
export const createPlan = async (req, res) => {
  try {
    const { name, priceMonthly, priceYearly, description, videoLimitPerMonth, features } = req.body;

    if (!name || !priceMonthly || !priceYearly || !videoLimitPerMonth) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingPlan = await Subscription.findOne({ name });
    if (existingPlan) {
      return res.status(400).json({ message: "Plan with this name already exists" });
    }

    const plan = await Subscription.create({
      name,
      priceMonthly,
      priceYearly,
      description,
      videoLimitPerMonth,
      features,
    });

    res.status(201).json({ success: true, plan });
  } catch (error) {
    console.error("Create Plan Error:", error);
    res.status(500).json({ message: "Failed to create plan" });
  }
};

// ✅ Get all plans
export const getPlans = async (req, res) => {
  try {
    const plans = await Subscription.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, plans });
  } catch (error) {
    console.error("Get Plans Error:", error);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

// ✅ Update plan (Admin)
export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const plan = await Subscription.findByIdAndUpdate(id, updates, { new: true });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({ success: true, message: "Plan updated successfully", plan });
  } catch (error) {
    console.error("Update Plan Error:", error);
    res.status(500).json({ message: "Failed to update plan" });
  }
};

// ✅ Delete plan (Admin)
export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Subscription.findByIdAndDelete(id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({ success: true, message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Delete Plan Error:", error);
    res.status(500).json({ message: "Failed to delete plan" });
  }
};
