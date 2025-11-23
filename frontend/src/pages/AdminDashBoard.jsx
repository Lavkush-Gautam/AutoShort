import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // icons
import Sidebar from "../components/admin/Sidebar";
import Dashboard from "../components/admin/DashBoard";
import Plans from "../components/admin/Plans";
import Payments from "../components/admin/Payments";
import Subscriptions from "../components/admin/Subscriptions";
import Analytics from "../components/admin/Analytics";
import Settings from "../components/admin/Setting";
import Users from "../components/admin/Users";
import Logout from "../components/dashboard/Logout";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Users":
        return <Users />;
      case "Plans":
        return <Plans />;
      case "Subscriptions":
        return <Subscriptions />;
      case "Analytics":
        return <Analytics />;
      case "Settings":
        return <Settings />;
      case "Logout":
        return <Logout />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-900">
      {/* Sidebar for large screens */}
      <div className="hidden md:flex">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
      </div>

      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 w-64 bg-white h-full shadow-lg transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        {/* Mobile header with menu button */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-700 focus:outline-none"
          >
            <Menu size={28} />
          </button>
          <h1 className="text-lg font-semibold">{activePage}</h1>
          <div className="w-7"></div>
        </div>

        {renderPage()}
      </main>
    </div>
  );
};

export default AdminDashboard;
