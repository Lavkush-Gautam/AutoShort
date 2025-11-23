import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    category: "Series & Videos",
    questions: [
      { q: "What is a Series?", a: "A Series is a collection of videos based on a single niche or topic that posts automatically to your channel." },
      { q: "Can I create videos in any niche?", a: "Yes, you can create videos in any niche supported by our platform’s AI tools." },
      { q: "What social media platforms do you support posting to?", a: "We currently support YouTube, Instagram, and TikTok auto-posting." },
      { q: "Are the videos unique?", a: "Yes, each video generated is unique thanks to our AI-powered content engine." },
      { q: "Can I edit the videos?", a: "Absolutely. You can preview and edit videos before posting." },
      { q: "How do custom prompts work?", a: "You can customize the prompts for more control over your video’s tone and content style." },
      { q: "How many videos can I create per day?", a: "That depends on your plan — higher tiers allow more daily videos." },
      { q: "Why am I not getting many views?", a: "We recommend optimizing your titles, descriptions, and posting consistently." },
      { q: "Can I replace an existing series with a new one?", a: "Yes, you can delete a series and create a new one at any time." },
      { q: "How do I create a video?", a: "Just click 'Create Video', choose your series, and our AI does the rest." },
      { q: "Can I adjust the video length?", a: "Yes, you can adjust video length from the settings before generation." },
      { q: "Do I own the videos?", a: "Yes, you own full rights to videos generated from your account." },
      { q: "Does the platform support multiple languages?", a: "Yes, our AI supports multiple major languages." },
      { q: "Are there any types of content that are not allowed?", a: "Yes, we prohibit harmful, adult, or misleading content." },
      { q: "Can this make long form content?", a: "Yes, depending on your plan and available credits." },
      { q: "What are image credits?", a: "Image credits are used to generate custom images for your videos." },
      { q: "What are motion credits?", a: "Motion credits are used for dynamic animation effects in videos." },
    ],
  },
  {
    category: "Billing",
    questions: [
      { q: "Is there a free trial?", a: "Yes, you can start for free and upgrade anytime." },
      { q: "Can I cancel at anytime?", a: "Yes, subscriptions can be canceled easily from your account settings." },
      { q: "How does the membership work?", a: "Membership gives you access to features based on your plan level." },
      { q: "Can I get a refund?", a: "Refunds are only available for billing errors or specific cases." },
      { q: "Can I upgrade or downgrade my subscription?", a: "Yes, you can change your plan anytime, and adjustments apply automatically." },
      { q: "Can I have multiple plans?", a: "Currently, each account supports one plan at a time." },
    ],
  },
];

const Questions = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const answerRefs = useRef({});

  // Scroll animation for each section
  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      el.querySelectorAll(".faq-section"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // Animate accordion open/close with GSAP
  const toggleAccordion = (index) => {
    const isOpen = openIndex === index;
    const answerEl = answerRefs.current[index];

    if (isOpen) {
      // Close animation
      gsap.to(answerEl, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      setOpenIndex(null);
    } else {
      // Close previously open one
      if (openIndex !== null && answerRefs.current[openIndex]) {
        gsap.to(answerRefs.current[openIndex], {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }

      // Open current one
      gsap.fromTo(
        answerEl,
        { height: 0, opacity: 0 },
        {
          height: answerEl.scrollHeight,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
      setOpenIndex(index);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="bg-linear-to-b from-orange-50 to-pink-50 py-16 px-4 md:px-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600">Have a question? We have answers.</p>
      </div>

      {faqData.map((section, sectionIndex) => (
        <div key={sectionIndex} className="faq-section mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            {section.category}
          </h3>
          <div className="space-y-3">
            {section.questions.map((item, index) => {
              const currentIndex = `${sectionIndex}-${index}`;
              const isOpen = openIndex === currentIndex;

              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(currentIndex)}
                    className="flex justify-between items-center w-full px-6 py-4 text-left text-gray-800 font-bold hover:bg-purple-50 transition"
                  >
                    {item.q}
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    ref={(el) => (answerRefs.current[currentIndex] = el)}
                    className="overflow-hidden h-0 opacity-0 px-6 pb-4 text-gray-600 text-md leading-relaxed"
                  >
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Questions;
