import React, { useState } from "react";
import { LogOut, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userontext";
import toast from "react-hot-toast";

const Logout = () => {
  const [confirmed, setConfirmed] = useState(false);
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); 
      setConfirmed(true);
      toast.success("You have been logged out!");

      // ✅ Redirect to home page after short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Something went wrong during logout!");
    }
  };

  const handleCancel = () => {
    navigate(-1); // go back to previous page
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-center space-y-5">
      {!confirmed ? (
        <>
          <div className="flex flex-col items-center space-y-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertTriangle size={40} className="text-yellow-600" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
              <LogOut size={22} className="text-red-500" /> Confirm Logout
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Are you sure you want to log out from your account? <br />
              You’ll need to log in again to continue using your dashboard.
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
            >
              <LogOut size={16} /> Yes, Logout
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-5 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition"
            >
              <XCircle size={16} /> Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-green-700">Logged Out</h2>
          <p className="text-sm text-gray-600">
            You’ve been logged out successfully. Redirecting to home...
          </p>
        </div>
      )}
    </div>
  );
};

export default Logout;
