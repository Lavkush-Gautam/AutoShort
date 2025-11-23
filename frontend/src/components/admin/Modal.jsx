import React from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-xl text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
