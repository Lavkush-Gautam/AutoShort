import React from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  CreditCard,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Users", icon: <Users size={20} /> },
    { name: "Plans", icon: <ClipboardList size={20} /> },
    { name: "Subscriptions", icon: <DollarSign size={20} /> },
    { name: "Analytics", icon: <BarChart3 size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
    { name: "Logout", icon: <LogOut size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-slate-800">Admin Panel</h1>
        <p className="text-sm text-slate-500">Control Center</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-md font-medium rounded-xl transition-all duration-200
              ${
                activePage === item.name
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Admin Dashboard
      </div>
    </aside>
  );
};

export default Sidebar;
