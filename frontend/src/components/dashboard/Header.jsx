import React from "react";
import { PlusCircle } from "lucide-react";

const Header = ({ title }) => (
  <header className="flex items-center justify-between mb-6">
    <h1 className="text-2xl font-semibold">{title}</h1>
    <div className="flex items-center gap-3">
      <input
        placeholder="Search..."
        className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-300"
      />
      <button className="px-4 py-2 rounded-md bg-indigo-600 text-white flex items-center gap-2">
        <PlusCircle size={16} />
        Create
      </button>
    </div>
  </header>
);

export default Header;
