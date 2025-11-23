import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/userontext.jsx";
import { useAuthModal } from "../context/authModalContext.jsx";

const AdminRoute = ({ children }) => {
  const { user, loading } = useUser();
  const { openAuthModal } = useAuthModal();

  if (loading) return null;

  if (!user) {
    openAuthModal("login");
    return <Navigate to="/" replace />;
  }

  
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
