import React, { useEffect, useState } from "react";
import { Video, CreditCard, Clock, CheckCircle } from "lucide-react";
import api from "../../helper/api.jsx";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVideos: 0,
    planName: "",
    planType: "",
    status: "",
    expiryDate: "",
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const { data } = await api.get("/user/dashboard"); // example route
        setStats(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchUserStats();
  }, []);

  const cards = [
    {
      title: "Videos Created",
      value: stats.totalVideos,
      icon: <Video className="text-red-500" size={22} />,
      bg: "bg-red-50",
    },
    {
      title: "Plan",
      value: stats.planName || "No Active Plan",
      icon: <CreditCard className="text-pink-500" size={22} />,
      bg: "bg-pink-50",
    },
    {
      title: "Plan Type",
      value: stats.planType ? stats.planType.toUpperCase() : "N/A",
      icon: <Clock className="text-purple-500" size={22} />,
      bg: "bg-purple-50",
    },
    {
      title: "Status",
      value: stats.status || "Inactive",
      icon: <CheckCircle className="text-green-500" size={22} />,
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-slate-800">Dashboard</h2>
        <p className="text-slate-500 text-sm">
          Welcome to your AutoShorts.ai dashboard. Track your plan, videos, and activity here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl shadow-sm flex justify-between items-center ${card.bg}`}
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

      {/* Subscription Info */}
      {stats.expiryDate && (
        <div className="bg-white  shadow-sm border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Subscription Details
          </h3>
          <p className="text-sm text-slate-600">
            Your <span className="font-medium text-pink-500">{stats.planName}</span> plan
            ({stats.planType}) is{" "}
            <span className="font-medium text-green-600">{stats.status}</span> and will expire on{" "}
            <span className="font-medium">{new Date(stats.expiryDate).toLocaleDateString()}</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
