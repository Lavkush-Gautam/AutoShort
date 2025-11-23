import React, { useState } from "react";
import {
  Grid,
  Play,
  PlusCircle,
  User,
  Settings,
  BarChart2,
  Wrench,
  BookOpen,
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ activePage, setActivePage }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(false);

  const navItems = [
    { label: "Upgrade", icon: PlusCircle },
    { label: "Dashboard", icon: Grid },
    { label: "Affiliates", icon: BarChart2 },
    { label: "Series", icon: Play, children: ["View", "Create"] },
    { label: "Tools", icon: Wrench },
    { label: "Guides", icon: BookOpen },
    { label: "Billing", icon: CreditCard },
    { label: "Account", icon: User },
    { label: "Settings", icon: Settings },
    { label: "Logout", icon: LogOut },
  ];

  return (
    <aside
      className={`transition-all duration-200 ease-in-out bg-white border-r border-gray-200 shadow-sm h-screen p-4 flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >

      {/* Navigation */}
      <nav className="flex-1 overflow-auto">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => {
                  if (item.children) {
                    setOpenSubmenu(openSubmenu === item.label ? false : item.label);
                  } else {
                    setActivePage(item.label);
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-md font-semibold transition-colors ${
                  activePage === item.label
                    ? "bg-gray-600 text-red-600"
                    : "text-slate-700 hover:bg-gray-100"
                }`}
              >
                <item.icon size={18} />
                {!collapsed && (
                  <span className="flex-1 text-left">{item.label}</span>
                )}
              </button>

              {/* Submenu for Series */}
              {!collapsed && item.children && openSubmenu === item.label && (
                <div className="pl-9 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child}
                      onClick={() => setActivePage(child)}
                      className={`w-full text-sm text-left px-2 py-1 rounded ${
                        activePage === child
                          ? "text-red-600 font-medium bg-indigo-150"
                          : "text-slate-600 hover:bg-gray-100"
                      }`}
                    >
                      {child}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
            LK
          </div>
          {!collapsed && (
            <div>
              <div className="text-sm font-medium">Lavkush</div>
              <div className="text-xs text-slate-500">Creator</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
