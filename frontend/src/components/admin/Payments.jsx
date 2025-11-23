import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import api from "../../helper/api.jsx"; // your axios helper
import { useUser } from "../../context/userontext.jsx";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { user } = useUser();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/payments/all"); // Adjust to your backend route
        setPayments(data.payments || []);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments =
    filter === "all"
      ? payments
      : payments.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-16">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Payment History
      </h1>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        {["all", "pending", "success", "failed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === f
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Payment Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-2xl p-4">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-pink-500" size={40} />
          </div>
        ) : filteredPayments.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No payments found.
          </p>
        ) : (
          <table className="w-full text-left text-gray-700">
            <thead className="border-b">
              <tr className="text-gray-600">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((p, i) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">{i + 1}</td>
                  <td className="py-3 px-4 font-semibold">{p.planName}</td>
                  <td className="py-3 px-4 capitalize">{p.planType}</td>
                  <td className="py-3 px-4">
                    ₹{p.amount} {p.currency}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Reusable Status Badge Component
const StatusBadge = ({ status }) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700",
    success: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
  };

  const icons = {
    pending: <Clock size={16} />,
    success: <CheckCircle size={16} />,
    failed: <XCircle size={16} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}
    >
      {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default Payments;
