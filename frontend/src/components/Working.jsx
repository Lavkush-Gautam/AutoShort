import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import step1 from "../assets/HowItWorks1.png";
import step2 from "../assets/HowItWorks2.png";
import step3 from "../assets/HowItWorks3.png";
import SectionHeader from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        img: step1,
        step: "Step 1",
        title: "Upload Your Content",
        desc: "Start by uploading your video idea or script. Our system analyzes it and prepares everything for editing.",
    },
    {
        img: step2,
        step: "Step 2",
        title: "AI-Powered Editing",
        desc: "Our AI automatically creates faceless videos with smooth transitions, captions, and engaging visuals.",
    },
    {
        img: step3,
        step: "Step 3",
        title: "Download & Share",
        desc: "Preview your video, make quick tweaks, and download instantly for sharing on any platform.",
    },
];

const Working = () => {
    const sectionsRef = useRef([]);

    useEffect(() => {
        sectionsRef.current.forEach((section) => {
            const text = section.querySelector(".text-part");
            const image = section.querySelector(".image-part");

            gsap.fromTo(
                text,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                image,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, []);

    return (
        <section className="bg-linear-to-b from-orange-50 to-pink-50 overflow-x-hidden">
           <SectionHeader />
            {steps.map((step, index) => (
                <div
                    key={index}
                    ref={(el) => (sectionsRef.current[index] = el)}
                    className={`h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 gap-10 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                >
                    {/* Image Section */}
                    <div className="image-part flex-1 flex shadow-2xs justify-center">
                        <img
                            src={step.img}
                            alt={step.title}
                            className="w-[80%] max-w-md object-contain rounded-3xl shadow-2xl"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="text-part flex-1 text-center md:text-left space-y-6">
                        {/* Step Button */}
                        <button className=" text-gray-800 border border-red-300 font-bold px-6 py-1 rounded-full text-lg shadow-lg hover:scale-105 transition-transform duration-300">
                            {step.step}
                        </button>

                        <h2 className="text-3xl md:text-3xl font-extrabold text-gray-800">
                            {step.title}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">{step.desc}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Working;
