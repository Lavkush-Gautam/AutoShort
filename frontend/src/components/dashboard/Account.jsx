import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Crown,
  Settings,
  Film,
  Shield,
  Power,
  Calendar,
  Music,
} from "lucide-react";
import { useUser } from "../../context/userontext.jsx";

const Account = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  // Stop loading once user is fetched
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (loading)
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <p className="text-slate-600">Loading account details...</p>
      </div>
    );

  if (!user)
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <p className="text-red-500">No user data found.</p>
      </div>
    );

  const { name, email, role, subscription, videosGenerated, settings, status } = user;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <User className="w-6 h-6 text-red-600" /> Account Overview
        </h2>
        <p className="text-sm text-slate-600">
          Manage your profile, subscription, and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <div>
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
          <Shield className="w-5 h-5 text-red-600" /> Profile Details
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> {name}
          </p>
          <p className="flex items-center gap-1">
            <Mail className="w-4 h-4 text-gray-500" /> {email}
          </p>
          <p className="flex items-center gap-1">
            <Crown className="w-4 h-4 text-yellow-500" /> Role: {role}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={
                status === "active"
                  ? "text-green-600 font-medium"
                  : status === "inactive"
                  ? "text-yellow-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {status}
            </span>
          </p>
        </div>
      </div>

      {/* Subscription Section */}
      <div>
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
          <Power className="w-5 h-5 text-green-600" /> Subscription
        </h3>
        {subscription ? (
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Plan:</span> {subscription.planName}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {subscription.planType}
            </p>
            <p className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-500" /> Start:{" "}
              {new Date(subscription.startDate).toLocaleDateString()}
            </p>
            <p className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-500" /> End:{" "}
              {new Date(subscription.endDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={
                  subscription.status === "active"
                    ? "text-green-600 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                {subscription.status}
              </span>
            </p>
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">No active subscription</p>
        )}
      </div>

      {/* Usage Info */}
      <div>
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
          <Film className="w-5 h-5 text-pink-600" /> Usage
        </h3>
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Videos Generated:</span> {videosGenerated}
        </p>
      </div>

      {/* Settings */}
      <div>
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
          <Settings className="w-5 h-5 text-gray-600" /> Preferences
        </h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-semibold">Voice Type:</span>{" "}
            {settings?.voiceType || "default"}
          </p>
          <p className="flex items-center gap-2">
            <Music className="w-4 h-4 text-gray-500" /> Background Music:{" "}
            <span
              className={
                settings?.backgroundMusic ? "text-green-600" : "text-red-500"
              }
            >
              {settings?.backgroundMusic ? "Enabled" : "Disabled"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
