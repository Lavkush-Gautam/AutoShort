import React, { useEffect, useState } from "react";

const UpdatePlanModal = ({ open, onClose, plan, onUpdate }) => {
  const [form, setForm] = useState({
    name: "",
    priceMonthly: "",
    priceYearly: "",
    description: "",
    videoLimitPerMonth: "",
    features: "",
  });

  useEffect(() => {
    if (plan) {
      setForm({
        name: plan.name || "",
        priceMonthly: plan.priceMonthly || "",
        priceYearly: plan.priceYearly || "",
        description: plan.description || "",
        videoLimitPerMonth: plan.videoLimitPerMonth || "",
        features: plan.features?.join(", ") || "",
      });
    }
  }, [plan]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const updatedData = {
      ...form,
      priceMonthly: Number(form.priceMonthly),
      priceYearly: Number(form.priceYearly),
      videoLimitPerMonth: Number(form.videoLimitPerMonth),
      features: form.features.split(",").map((f) => f.trim()),
    };

    // ✅ THIS IS THE FIX
    onUpdate(plan._id, updatedData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[420px] shadow-2xl border border-gray-100">
        
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Plan</h2>

        <div className="space-y-4">
          <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border p-2.5 rounded-xl" />
          <input type="number" name="priceMonthly" value={form.priceMonthly} onChange={handleChange} className="w-full border p-2.5 rounded-xl" />
          <input type="number" name="priceYearly" value={form.priceYearly} onChange={handleChange} className="w-full border p-2.5 rounded-xl" />
          <input type="number" name="videoLimitPerMonth" value={form.videoLimitPerMonth} onChange={handleChange} className="w-full border p-2.5 rounded-xl" />
          <input type="text" name="description" value={form.description} onChange={handleChange} className="w-full border p-2.5 rounded-xl" />
          <textarea name="features" value={form.features} onChange={handleChange} className="w-full border p-2.5 rounded-xl h-24" />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-200">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-xl bg-yellow-500 text-white">Update</button>
        </div>

      </div>
    </div>
  );
};

export default UpdatePlanModal;
