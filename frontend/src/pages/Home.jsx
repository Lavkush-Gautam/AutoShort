import React from "react";
import PresentSection from "../components/PresentSection";
import VideosSection from "../components/VideosSection";
import Working from "../components/Working";
import Pricing from "../components/Pricing";
import Questions from "../components/Questions";
import { useScroll } from "../context/scrollContext";

const Home = () => {
  const { presentRef, videosRef, workingRef, pricingRef, faqRef } = useScroll();

  return (
    <div className="px-5">
      <section ref={presentRef} className="mt-2">
        <PresentSection />
      </section>

      <section ref={videosRef} className="mt-12">
        <VideosSection />
      </section>

      <section ref={workingRef} className="mt-2">
        <Working />
      </section>

      <section ref={pricingRef} className="">
        <Pricing />
      </section>

      <section ref={faqRef} className="mt-2">
        <Questions />
      </section>
    </div>
  );
};

export default Home;
