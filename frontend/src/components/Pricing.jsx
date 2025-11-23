import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUser } from "../context/userontext.jsx";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(true);
  const cardsRef = useRef([]);
  const { user, getPlans,createOrder,verifyPayment } = useUser();
  const [plans, setPlans] = useState([]);

  // ✅ Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      const data = await getPlans();
      const formattedPlans = (data || []).map((plan) => ({
        _id: plan._id,
        name: plan.name,
        monthly: plan.priceMonthly,
        yearly: plan.priceYearly,
        note: plan.description,
        features: plan.features || [],
      }));
      setPlans(formattedPlans);
    };
    fetchPlans();
  }, []);

  // 🌀 Scroll animations
  useEffect(() => {
    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  // 💫 Price switch animation
  useEffect(() => {
    gsap.fromTo(
      ".price",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
    );
  }, [isYearly]);

  // 💳 Handle Razorpay Payment
 const handlePayment = async (plan) => {

  try {

    if (plan.name === "FREE") {
      navigate("/dashboard");
      return;
    }
    const planType = isYearly ? "yearly" : "monthly";

    // ✅ Step 1: Create Razorpay order via context
    const { order, key, paymentId } = await createOrder(plan._id, planType);

    // ✅ Step 2: Setup Razorpay payment options
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "VideoApp",
      description: `${plan.name} Plan Subscription`,
      order_id: order.id,
      handler: async (response) => {
        // ✅ Step 3: Verify payment via context
        await verifyPayment({
          ...response,
          paymentId, // ✅ Important: send this
        });
      },
      theme: { color: "#f472b6" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (err) {
    console.error("Payment failed:", err);
    alert("Payment failed. Try again.");
  }
};



  return (
    <section className="bg-linear-to-b from-orange-50 to-pink-50 py-20 px-6 md:px-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-black mb-3">PRICING</h2>
        <p className="text-lg text-gray-600 font-medium tracking-wide mb-6">
          PAY FOR WHAT YOU NEED
        </p>

        {/* Toggle Button */}
        <div className="flex items-center justify-center gap-4">
          <span
            className={`font-semibold ${!isYearly ? "text-pink-500" : "text-gray-500"}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-8 bg-gray-300 rounded-full transition-all duration-300"
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                isYearly ? "translate-x-6 bg-pink-500" : ""
              }`}
            ></span>
          </button>
          <span
            className={`font-semibold ${isYearly ? "text-pink-500" : "text-gray-500"}`}
          >
            Yearly
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={plan._id || i}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`flex flex-col justify-between p-8 rounded-3xl shadow-lg border bg-white border-pink-100 transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${
              plan.name === "DAILY"
                ? "bg-linear-to-br from-pink-500 to-orange-400 text-white border-none"
                : ""
            }`}
          >
            <div>
              <h3
                className={`text-2xl font-extrabold mb-3 ${
                  plan.name === "DAILY" ? "text-white" : "text-gray-800"
                }`}
              >
                {plan.name}
              </h3>

              <p
                className={`price text-3xl font-bold mb-2 ${
                  plan.name === "DAILY" ? "text-white" : "text-gray-800"
                }`}
              >
                ₹{isYearly ? plan.yearly : plan.monthly}
              </p>

              <p
                className={`text-sm mb-6 ${
                  plan.name === "DAILY" ? "text-orange-100" : "text-gray-500"
                }`}
              >
                {plan.note}
              </p>

              <ul className="space-y-3 text-sm">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className={`flex items-center gap-2 ${
                      plan.name === "DAILY" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    <span className="text-pink-500 font-bold">✔</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handlePayment(plan)}
              className={`mt-8 w-full py-3 rounded-full font-semibold transition-all cursor-pointer ${
                plan.name === "DAILY"
                  ? "bg-white text-pink-600 hover:bg-pink-100"
                  : "bg-linear-to-r from-pink-500 to-orange-400 text-white hover:opacity-90"
              }`}
            >
              {plan.name === "FREE" ? "Get Started"  : "Subscribe Now"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
