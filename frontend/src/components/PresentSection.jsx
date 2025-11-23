import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userontext";
import { toast } from "react-hot-toast";
import AuthModal from "../components/AuthModal";

const PresentSection = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultForm, setDefaultForm] = useState("login"); // "login" or "register"

  const handleStart = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      toast("Please login or register to continue!", { icon: "🔐" });
      setDefaultForm("login");
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section className="w-full h-screen bg-linear-to-b from-orange-50 to-pink-50 py-20 px-6 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Faceless Videos on{" "}
            <span className="text-pink-600">Auto-Pilot</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
            Create stunning, viral faceless videos effortlessly with AI —  
            no camera, no editing, no stress. Focus on your ideas, we handle the rest.
          </p>

          <div className="flex justify-center md:justify-start">
            <button
              onClick={handleStart}
              className="bg-linear-to-r from-pink-500 to-red-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Start for Free
            </button>
          </div>

          <p className="text-gray-500 text-sm md:text-base">
            No credit card required • Get your first video in minutes
          </p>
        </div>

        {/* Right Video Preview */}
        <div className="flex-1 flex justify-center border-4 border-pink-200 rounded-2xl shadow-xl overflow-hidden p-4 bg-linear-to-b from-pink-50 to-white">
          <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-pink-200 hover:scale-[1.03] transition-transform duration-500 ease-out hover:shadow-pink-300/50">
            <iframe
              src="https://www.youtube.com/embed/ZV5yTm2pQ7A?autoplay=1&mute=1&loop=1&playlist=ZV5yTm2pQ7A"
              title="Faceless AI Promo Demo"
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-2xl font-extrabold backdrop-blur-sm transition-opacity duration-500 hover:opacity-0">
              🎬 Watch It Work
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultForm={defaultForm}
      />
    </>
  );
};

export default PresentSection;
