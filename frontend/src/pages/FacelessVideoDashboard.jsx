import React, { useState } from "react";
import { Menu } from "lucide-react"; // for mobile toggle icon

import Pricing from "../components/Pricing";
import Affiliates from "../components/dashboard/Affiliate";
import SeriesView from "../components/dashboard/SeriesView";
import SeriesCreate from "../components/dashboard/SeriesCreate";
import Tools from "../components/dashboard/Tools";
import Billing from "../components/dashboard/Billing";
import Account from "../components/dashboard/Account";
import Settings from "../components/admin/Setting";
import Logout from "../components/dashboard/Logout";
import Dashboard from "../components/dashboard/Dashboard";
import Sidebar from "../components/dashboard/Sidebar";
import Guides from "../components/dashboard/Guides";

const FacelessVideoDashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case "Upgrade": return <Pricing />;
      case "Affiliates": return <Affiliates />;
      case "View": return <SeriesView />;
      case "Create": return <SeriesCreate />;
      case "Tools": return <Tools />;
      case "Guides": return <Guides />;
      case "Billing": return <Billing />;
      case "Account": return <Account />;
      case "Settings": return <Settings />;
      case "Logout": return <Logout />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-slate-900 relative">
      {/* Sidebar for large screens */}
      <div className="hidden md:flex">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
      </div>

      {/* Overlay for mobile */}
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

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        {/* Mobile header */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-700 focus:outline-none"
          >
            <Menu size={28} />
          </button>
          <h1 className="text-lg font-semibold">{activePage}</h1>
          <div className="w-7" /> {/* spacer for symmetry */}
        </div>

        {renderPage()}
      </main>
    </div>
  );
};

export default FacelessVideoDashboard;
