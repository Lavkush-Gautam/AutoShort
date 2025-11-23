import React, { useState } from "react";

const CreatePlanModal = ({ open, onClose, onCreate }) => {
  const [form, setForm] = useState({
    name: "",
    priceMonthly: "",
    priceYearly: "",
    description: "",
    videoLimitPerMonth: "",
    features: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      name: form.name,
      priceMonthly: Number(form.priceMonthly),
      priceYearly: Number(form.priceYearly),
      description: form.description,
      videoLimitPerMonth: Number(form.videoLimitPerMonth),
      features: form.features.split(",").map((f) => f.trim()),
    };

    onCreate(payload);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[420px] shadow-2xl border border-gray-200">

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Plan</h2>

        <div className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Plan Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2.5 rounded-xl"
          />

          {/* Monthly Price */}
          <input
            type="number"
            name="priceMonthly"
            placeholder="Monthly Price"
            value={form.priceMonthly}
            onChange={handleChange}
            className="w-full border p-2.5 rounded-xl"
          />

          {/* Yearly Price */}
          <input
            type="number"
            name="priceYearly"
            placeholder="Yearly Price"
            value={form.priceYearly}
            onChange={handleChange}
            className="w-full border p-2.5 rounded-xl"
          />

          {/* Video Limit */}
          <input
            type="number"
            name="videoLimitPerMonth"
            placeholder="Video Limit Per Month"
            value={form.videoLimitPerMonth}
            onChange={handleChange}
            className="w-full border p-2.5 rounded-xl"
          />

          {/* Description */}
          <input
            type="text"
            name="description"
            placeholder="Short Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2.5 rounded-xl"
          />

          {/* Features */}
          <textarea
            name="features"
            placeholder="Features (comma separated)"
            value={form.features}
            onChange={handleChange}
            className="w-full border p-2.5 rounded-xl h-24"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl bg-red-500 text-white"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreatePlanModal;
