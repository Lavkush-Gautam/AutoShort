import React, { useEffect, useState } from "react";
import { Loader2, CreditCard, CheckCircle, XCircle } from "lucide-react";
import api from "../../helper/api.jsx";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { data } = await api.get("/admin/subscriptions");
        setSubscriptions(data);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <CreditCard className="text-pink-500" /> Subscriptions Overview
        </h2>
        <p className="text-sm text-slate-500">
          Total Records: {subscriptions.length}
        </p>
      </div>

      {subscriptions.length === 0 ? (
        <div className="text-center text-slate-500 py-10">
          No subscriptions found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600">
                <th className="p-3 font-medium">User</th>
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Plan</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Start Date</th>
                <th className="p-3 font-medium">End Date</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-slate-50 transition-colors"
                >
                  <td className="p-3">{sub.name}</td>
                  <td className="p-3 text-slate-600">{sub.email}</td>
                  <td className="p-3 font-medium text-slate-800">
                    {sub.planName}
                  </td>
                  <td className="p-3 capitalize text-slate-700">
                    {sub.planType}
                  </td>
                  <td className="p-3">
                    {sub.status === "active" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-full">
                        <CheckCircle size={12} /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-full">
                        <XCircle size={12} /> Expired
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-600">
                    {sub.startDate
                      ? new Date(sub.startDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="p-3 text-slate-600">
                    {sub.endDate
                      ? new Date(sub.endDate).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
