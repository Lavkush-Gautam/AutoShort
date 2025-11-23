import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import AuthModal from "../components/AuthModal";
import { useUser } from "../context/userontext";
import Loader from "./Loader";
import { useScroll } from "../context/scrollContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultForm, setDefaultForm] = useState("login");

    const { user, loading } = useUser();

    const {
        scrollToSection,
        presentRef,
        videosRef,
        workingRef,
        pricingRef,
        faqRef,
    } = useScroll();

    const openModal = (formType) => {
        setDefaultForm(formType);
        setIsModalOpen(true);
    };

    if (loading) return <Loader />;

    return (
        <>
            <nav className="w-full bg-white z-50">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl sm:text-3xl font-bold text-pink-600 tracking-wide"
                    >
                        GenAi<span className="text-gray-800">Cuts</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
                        <button
                            onClick={() => scrollToSection(presentRef)}
                            className="hover:text-pink-600 transition"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection(videosRef)}
                            className="hover:text-pink-600 transition"
                        >
                            Videos
                        </button>
                        <button
                            onClick={() => scrollToSection(workingRef)}
                            className="hover:text-pink-600 transition"
                        >
                            How It Works
                        </button>
                        <button
                            onClick={() => scrollToSection(pricingRef)}
                            className="hover:text-pink-600 transition"
                        >
                            Pricing
                        </button>
                        <button
                            onClick={() => scrollToSection(faqRef)}
                            className="hover:text-pink-600 transition"
                        >
                            FAQ
                        </button>
                    </div>

                    {/* Desktop Auth/User Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            // ✅ User logged in: show name/icon only
                            <div className="flex items-center space-x-2 text-gray-700">
                                <User size={26} />
                                <span className="font-medium">{user.name}</span>
                            </div>
                        ) : (
                            // ✅ Not logged in: show login/register
                            <div className="flex bg-linear-to-r from-pink-500 to-red-500 text-white rounded-full overflow-hidden shadow-md">
                                <button
                                    onClick={() => openModal("login")}
                                    className="px-5 py-2 text-lg font-medium hover:bg-white/10 transition"
                                >
                                    Login
                                </button>
                                <span className="w-px h-6 bg-white/30 self-center"></span>
                                <button
                                    onClick={() => openModal("register")}
                                    className="px-5 py-2 text-lg font-medium hover:bg-white/10 transition"
                                >
                                    Register
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-gray-800 p-2 rounded-md hover:bg-gray-100 transition"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden bg-white shadow-inner border-t border-gray-200 overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="flex flex-col px-6 py-4 space-y-3 text-gray-700 font-medium">
                        {[{ name: "Home", ref: presentRef },
                          { name: "Videos", ref: videosRef },
                          { name: "How It Works", ref: workingRef },
                          { name: "Pricing", ref: pricingRef },
                          { name: "FAQ", ref: faqRef }].map(({ name, ref }) => (
                            <button
                                key={name}
                                onClick={() => {
                                    scrollToSection(ref);
                                    setIsOpen(false);
                                }}
                                className="text-left hover:text-pink-600 transition"
                            >
                                {name}
                            </button>
                        ))}

                        {/* Mobile Auth/User Section */}
                        {user ? (
                            <div className="mt-4 flex items-center space-x-2 text-gray-700">
                                <User size={24} className="text-pink-600" />
                                <span className="font-medium">{user.name}</span>
                            </div>
                        ) : (
                            <div className="flex bg-linear-to-r from-pink-500 to-red-500 text-white rounded-full overflow-hidden mt-4">
                                <button
                                    onClick={() => { openModal("login"); setIsOpen(false); }}
                                    className="w-1/2 text-center py-3 font-medium hover:bg-white/10 transition"
                                >
                                    Login
                                </button>
                                <span className="w-px h-6 bg-white/30 self-center"></span>
                                <button
                                    onClick={() => { openModal("register"); setIsOpen(false); }}
                                    className="w-1/2 text-center py-3 font-medium hover:bg-white/10 transition"
                                >
                                    Register
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Auth Modal */}
            <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                defaultForm={defaultForm}
            />
        </>
    );
};

export default Navbar;
