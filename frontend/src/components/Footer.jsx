import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Facebook,
  Instagram,
  Youtube,
  Info,
  HelpCircle,
  Mail,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const footerData = [
  {
    title: "Company",
    icon: <Info className="w-4 h-4 text-gray-800" />,
    links: [
      "Pricing",
      "Affiliates",
      "Contact Us",
      "Support",
      "FAQ",
      "Terms & Conditions",
      "Privacy Policy",
      "Google API Disclosure",
    ],
  },
  {
    title: "Alternatives",
    icon: <HelpCircle className="w-4 h-4 text-gray-800" />,
    links: [
      "Faceless.video",
      "Vadoo AI",
      "Nullface AI",
      "Smart Short AI",
      "Crayo AI",
      "AIVideo.com",
    ],
  },
  {
    title: "Social",
    icon: <Mail className="w-4 h-4 text-gray-800" />,
    social: true,
    links: [
      { name: "Facebook", icon: <Facebook className="w-6 h-6" />, color: "text-gray-900" },
      { name: "Instagram", icon: <Instagram className="w-6 h-6" />, color: "text-gray-900" },
      { name: "YouTube", icon: <Youtube className="w-6 h-6" />, color: "text-gray-900" },
    ],
    extraLinks: ["Custom Prompt Tool", "Alternatives"],
  },
];

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className=" text-gray-700 bg-linear-to-b from-orange-200 to-pink-150 py-12 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* --- Brand --- */}
        <div>
          <h2 className="text-2xl font-extrabold text-black mb-3">
            GenAiShorts.ai
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">
            GenShorts.ai automatically creates, schedules, and posts faceless
            videos for you, on auto-pilot. Each video is unique and customized
            to your topic.
          </p>
          <p className="text-xs text-gray-700 mt-4">© 2025 GenAiShorts.ai</p>
        </div>

        {/* --- Dynamically Render Sections --- */}
        {footerData.map((section, i) => (
          <div key={i}>
            <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
              {section.icon} {section.title}
            </h3>

            {/* --- Social Section --- */}
            {section.social ? (
              <>
                <div className="flex space-x-4 text-xl">
                  {section.links.map((link, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`hover:${link.color} transition rounded-full p-1 bg-amber-300`}
                      aria-label={link.name}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                  Articles
                </h4>
                <ul className="space-y-2 text-sm">
                  {section.extraLinks.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="hover:text-gray-900 transition">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <ul className="space-y-2 text-sm">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="hover:text-gray-950 transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* --- Bottom Line --- */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        Built with ❤️ by GenAiShorts.ai Team
      </div>
    </footer>
  );
};

export default Footer;
