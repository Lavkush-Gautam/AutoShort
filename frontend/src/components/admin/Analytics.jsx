import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, Users, Activity, DollarSign } from "lucide-react";
import api from "../../helper/api.jsx";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    dailyActiveUsers: 0,
    newSubscriptions: 0,
    churnRate: 0,
    revenueGrowth: 0,
  });
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [subscriptionData, setSubscriptionData] = useState([]);

  // Fetch analytics data (you can connect with backend later)
useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      const { data } = await api.get("/admin/analytics");
      setAnalytics({
        dailyActiveUsers: data.dailyActiveUsers,
        newSubscriptions: data.newSubscriptions,
        churnRate: data.churnRate,
        revenueGrowth: data.revenueGrowth,
      });
      setUserGrowthData(data.userGrowthData || []);
      setSubscriptionData(data.subscriptionData || []);
    } catch (err) {
      console.error("Error fetching analytics:", err);
    }
  };
  fetchAnalytics();
}, []);


  const cards = [
    {
      title: "Daily Active Users",
      value: analytics.dailyActiveUsers,
      icon: <Activity className="text-blue-500" size={22} />,
      bg: "bg-blue-50",
    },
    {
      title: "New Subscriptions",
      value: analytics.newSubscriptions,
      icon: <Users className="text-green-500" size={22} />,
      bg: "bg-green-50",
    },
    {
      title: "Churn Rate",
      value: `${analytics.churnRate}%`,
      icon: <TrendingUp className="text-red-500" size={22} />,
      bg: "bg-red-50",
    },
    {
      title: "Revenue Growth",
      value: `${analytics.revenueGrowth}%`,
      icon: <DollarSign className="text-purple-500" size={22} />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Analytics Overview</h1>
        <p className="text-slate-500 text-sm">
          Monitor user activity, subscriptions, and revenue growth over time.
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

      {/* User Growth Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          User Growth Over Time
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#b75632ff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subscriptions Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Subscription Trends
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subscriptionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="active" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="cancelled" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
