import React, { useEffect, useState } from "react";
import { Users, CreditCard, DollarSign, Layers } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import api from "../../helper/api.jsx";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    totalRevenue: 0,
    totalPlans: 0,
  });
  const [revenueData, setRevenueData] = useState([]);

  // Temporary data (replace with API later)
  useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      const data = res.data;
      setStats({
        totalUsers: data.totalUsers,
        activeSubscriptions: data.activeSubscriptions,
        totalRevenue: data.totalRevenue,
        totalPlans: data.totalPlans,
      });
      setRevenueData(data.revenueData || []);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };
  fetchStats();
}, []);


  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="text-red-500" size={22} />,
      bg: "bg-blue-50",
    },
    {
      title: "Active Subscriptions",
      value: stats.activeSubscriptions,
      icon: <Layers className="text-green-500" size={22} />,
      bg: "bg-green-50",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="text-purple-500" size={22} />,
      bg: "bg-purple-50",
    },
    {
      title: "Total Plans",
      value: stats.totalPlans,
      icon: <CreditCard className="text-pink-500" size={22} />,
      bg: "bg-pink-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm">
          Overview of users, revenue, and subscription analytics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-2xl shadow-sm p-5 flex justify-between items-center ${card.bg}`}
          >
            <div>
              <h3 className="text-sm text-slate-600">{card.title}</h3>
              <p className="text-xl font-semibold text-slate-800 mt-1">
                {card.value}
              </p>
            </div>
            <div className="p-3 rounded-full bg-white shadow">{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Revenue Growth
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ce4011ff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
