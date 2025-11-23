
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-linear-to-b from-orange-50 to-pink-50">
      
      {/* Glowing spinner */}
      <div className="relative">
        <div className="h-16 w-16 sm:h-20 sm:w-20 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg sm:text-2xl font-bold text-pink-600">⚡</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="mt-6 text-2xl sm:text-4xl font-extrabold text-gray-800 text-center animate-pulse">
        Welcome to <span className="text-pink-600">GenAiCuts</span>
      </h1>

      {/* Subtext */}
      <p className="mt-2 text-gray-500 font-medium text-sm sm:text-base text-center">
        Preparing your experience...
      </p>
    </div>
  );
};

export default Loader;
