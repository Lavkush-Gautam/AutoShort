import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import FacelessVideoDashboard from "./pages/FacelessVideoDashboard";
import AdminDashBoard from "./pages/AdminDashBoard";

import ProtectedRoute from "./helper/ProtectedRoute";
import AdminRoute from "./helper/AdminRoute";

import { UserProvider } from "./context/userontext";
import { ScrollProvider } from "./context/scrollContext";
import { AuthModalProvider } from "./context/authModalContext";

const App = () => {
  return (
    <UserProvider>
      <ScrollProvider>
        <AuthModalProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            {/* 🔒 User Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <FacelessVideoDashboard />
                </ProtectedRoute>
              }
            />

            {/* 🔒 Admin Dashboard */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashBoard />
                </AdminRoute>
              }
            />
          </Routes>

          <Footer />
        </AuthModalProvider>
      </ScrollProvider>
    </UserProvider>
  );
};

export default App;
