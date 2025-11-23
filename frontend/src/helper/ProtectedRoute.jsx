import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/userontext.jsx";
import { useAuthModal } from "../context/authModalContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  const { openAuthModal } = useAuthModal();

  if (loading) return null; // or loader

  // ❌ if user is NOT logged in
  if (!user) {
    openAuthModal("login"); // show login popup
    return <Navigate to="/" replace />;
  }

  // ✅ Logged in
  return children;
};

export default ProtectedRoute;
