import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userontext.jsx";
import CreatePlanModal from "../admin/CreateplanModal.jsx";
import UpdatePlanModal from "../admin/UpdatePlanModal.jsx";
import DeleteConfirmModal from "../admin/DeleteConfirmModal.jsx";

const Plans = () => {

  const {
    plans,
    getPlans,
    createPlan,
    updatePlan,
    deletePlan,
  } = useUser();

  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Modal States
  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // 🔹 Fetch plans on mount
  useEffect(() => {
    const loadPlans = async () => {
      await getPlans();
      setLoading(false);
    };
    loadPlans();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border text-center text-slate-600">
        Loading plans...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Subscription Plans</h2>

        <button
          className="px-4 py-2 border-2 border-red-400 text-gray-800 rounded-lg text-sm"
          onClick={() => setCreateOpen(true)}
        >
          + Create Plan
        </button>
      </div>

      {/* Plan List */}
      {plans.length === 0 ? (
        <p className="text-center text-slate-500 py-8">No plans available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-md bg-gray-50 transition-all"
            >
              <h3 className="text-lg font-bold text-slate-800">{plan.name}</h3>

              <p className="text-slate-500 text-sm mb-2">{plan.description}</p>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-red-400">
                  ${plan.priceMonthly} / Mo
                </span>
                <span className="text-2xl font-bold text-slate-600">
                  ${plan.priceYearly} / Yr
                </span>
              </div>

              {plan.features?.length > 0 && (
                <ul className="space-y-2 text-sm text-slate-700 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setUpdateOpen(true);
                  }}
                  className="px-3 py-1.5 text-sm bg-yellow-100 text-yellow-700 rounded-md"
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setDeleteOpen(true);
                  }}
                  className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <CreatePlanModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createPlan} // 🔥 FROM CONTEXT
      />

      <UpdatePlanModal
        open={updateOpen}
        plan={selectedPlan}
        onClose={() => setUpdateOpen(false)}
        onUpdate={(id, updates) => updatePlan(id, updates)}
      />


      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => deletePlan(selectedPlan._id)}  // 👈 PERFECT
      />

    </div>
  );
};

export default Plans;
