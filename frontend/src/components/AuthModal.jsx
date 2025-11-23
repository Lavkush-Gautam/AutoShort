import React, { useState, useEffect, useRef } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { gsap } from "gsap";
import google from '../assets/google.png';
import { useUser } from "../context/userontext"

const AuthModal = ({ isOpen, onClose, defaultForm = "login" }) => {
  const [isLogin, setIsLogin] = useState(defaultForm === "login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef(null);

  const { register, login } = useUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;

    if (isLogin) {
      data = await login(form);
    } else {
      data = await register(form);
    }

    if (data.error) {
      console.error(data.error);
      // You can show error to user here
    } else {
      console.log("Success:", data.user);
      onClose();
    }
  };


  useEffect(() => {
    setIsLogin(defaultForm === "login");

    if (isOpen) {
      // Animate modal in
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: -50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [defaultForm, isOpen]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", email: "", password: "" });
    setShowPassword(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 bg-white/20">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Full Name for Register */}
          {!isLogin && (
            <div className="relative">
              <User className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-600" size={20} strokeWidth={1.5} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full pl-12 p-4 border border-gray-300 rounded-xl bg-white/30 backdrop-blur-md placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-600" size={20} strokeWidth={1.5} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-12 p-4 border border-gray-300 rounded-xl bg-white/30 backdrop-blur-md placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-600" size={20} strokeWidth={1.5} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-12 pr-12 p-4 border border-gray-300 rounded-xl bg-white/30 backdrop-blur-md placeholder-gray-600 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg md:text-xl bg-linear-to-r from-pink-500 to-red-500 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 text-gray-400 mt-2 mb-2">
            <span className="h-px w-16 bg-gray-300"></span>
            <span>OR</span>
            <span className="h-px w-16 bg-gray-300"></span>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={() => console.log("Login with Google")}
            className="flex items-center justify-center gap-3 w-full py-3 bg-white rounded-full shadow-md hover:shadow-lg transition transform hover:scale-105"
          >
            <img
              src={google}
              alt="Google"
              className="w-6 h-6"
            />
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>
        </form>

        {/* Toggle Form */}
        <p className="mt-6 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={toggleForm}
            className="text-blue-400 cursor-pointer font-semibold"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
