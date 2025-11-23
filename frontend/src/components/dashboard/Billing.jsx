import React, { useEffect, useState } from "react";
import api from "../../helper/api.jsx";
import {
  Loader2,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Download,
} from "lucide-react";
import generateReceipt from "./reciept.js";


const Billing = () => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const { data } = await api.get("/user/payments/user-payments", {
          withCredentials: true,
        });
        setPayment(data.payments[0] || null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch payment info");
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentInfo();
  }, []);

 


  const getStatusIcon = (status) => {
    if (status === "success") return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === "failed") return <XCircle className="w-5 h-5 text-red-500" />;
    return <Clock className="w-5 h-5 text-yellow-500" />;
  };

  if (loading)
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center gap-2 text-slate-600">
        <Loader2 className="animate-spin w-5 h-5" /> Loading billing details...
      </div>
    );

  if (error)
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );

  if (!payment)
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
        <h2 className="text-2xl font-semibold mb-2">Billing</h2>
        <p className="text-slate-600">No active subscription found.</p>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold bg-linear-to-r from-red-500 to-pink-300 bg-clip-text text-transparent">
            Billing Summary
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Your latest subscription and payment information.
          </p>
        </div>

        {/* Download Receipt Button */}
        <button
          onClick={generateReceipt(payment)}
          className="flex items-center gap-2 bg-linear-to-r from-red-500 to-vpink-300 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
        >
          <Download className="w-4 h-4" />
          Download Receipt
        </button>
      </div>

      {/* Plan Section */}
      <div className="bg-linear-to-r from-pink-100 to-violet-100 rounded-xl p-4 flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {payment.planName} Plan
          </h3>
          <p className="text-slate-600 text-sm capitalize">
            {payment.planType} subscription
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">₹{payment.amount}</p>
          <p className="text-xs text-slate-500 uppercase">{payment.currency}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-500" />
            <span className="font-medium text-slate-700">Order ID:</span>
          </div>
          <span className="text-slate-600">{payment.orderId}</span>
        </div>

        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center gap-2">
            {getStatusIcon(payment.status)}
            <span className="font-medium text-slate-700">Status:</span>
          </div>
          <span
            className={`font-semibold ${
              payment.status === "success"
                ? "text-green-600"
                : payment.status === "failed"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {payment.status}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="font-medium text-slate-700">Payment Date:</span>
          </div>
          <span className="text-slate-600">
            {new Date(payment.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Billing;
