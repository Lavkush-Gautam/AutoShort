import React, { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle, Video, Settings, FileText } from "lucide-react";

const SeriesCreate = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    content: "",
    narrationVoice: "",
    artStyle: "",
    aspectRatio: "Vertical (9:16)",
    videoLanguage: "English",
    durationPreference: "60_TO_90",
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Series Created:", formData);
    alert("Your series has been created successfully!");
  };

  const steps = [
    { id: 1, title: "Destination", icon: <Video className="w-4 h-4" /> },
    { id: 2, title: "Content", icon: <FileText className="w-4 h-4" /> },
    { id: 3, title: "Series Settings", icon: <Settings className="w-4 h-4" /> },
    { id: 4, title: "Create", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="flex justify-between mb-6">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`flex-1 flex flex-col items-center ${
              s.id <= step ? "text-green-600" : "text-slate-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 ${
                s.id <= step ? "border-red-600 bg-violet-100" : "border-gray-200"
              }`}
            >
              {s.icon}
            </div>
            <p className="text-sm font-medium">{s.title}</p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Step 1: Destination</h3>
          <p className="text-slate-600 mb-4">
            The account where your video series will be posted.
          </p>
          <select
            value={formData.destination}
            onChange={(e) => handleChange("destination", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Destination</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Step 2: Content</h3>
          <p className="text-slate-600 mb-4">
            What will your video series be about?
          </p>
          <input
            type="text"
            value={formData.content}
            onChange={(e) => handleChange("content", e.target.value)}
            placeholder="e.g., Random AI Story"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-violet-500"
          />
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition">
              Choose Content
            </button>
            <button className="px-4 py-2 bg-gray-100 text-slate-700 rounded-lg hover:bg-gray-200 transition">
              Show Sample
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Step 3: Series Settings</h3>
          <p className="text-slate-600 mb-4">
            Preferences for every video in your series.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Narration Voice</label>
              <input
                type="text"
                value={formData.narrationVoice}
                onChange={(e) => handleChange("narrationVoice", e.target.value)}
                placeholder="Enter voice name or select AI voice"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Art Style</label>
              <input
                type="text"
                value={formData.artStyle}
                onChange={(e) => handleChange("artStyle", e.target.value)}
                placeholder="e.g., Realistic, Cartoon, Anime"
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Aspect Ratio</label>
              <select
                value={formData.aspectRatio}
                onChange={(e) => handleChange("aspectRatio", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                <option>Vertical (9:16)</option>
                <option>Horizontal (16:9)</option>
                <option>Square (1:1)</option>
              </select>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Video Language</label>
                <select
                  value={formData.videoLanguage}
                  onChange={(e) => handleChange("videoLanguage", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Duration Preference</label>
                <select
                  value={formData.durationPreference}
                  onChange={(e) => handleChange("durationPreference", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option>30_TO_60</option>
                  <option>60_TO_90</option>
                  <option>90_TO_120</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3">Step 4: Create</h3>
          <p className="text-slate-600 mb-4">
            You will be able to preview your upcoming videos before posting.
          </p>
          <button
            onClick={handleSubmit}
            className="bg-linear-to-r from-pink-500 to-violet-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md transition"
          >
            Create Series
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            onClick={prevStep}
            className="flex items-center gap-2 border-2 px-4 py-2 rounded-lg text-slate-800  hover:bg-gray-200 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 && (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-white bg-linear-to-r from-pink-500 to-red-200 hover:shadow-md transition"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SeriesCreate;
