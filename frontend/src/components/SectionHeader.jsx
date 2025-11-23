import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SectionHeader = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div
      ref={headerRef}
      className="flex text-center flex-col items-center gap-2"
    >
      <h2 className="text-4xl md:text-4xl font-extrabold text-gray-800 pt-12 mb-3 relative inline-block">
        How Does It Work?
       </h2>
      <p className="text-lg md:text-lg text-gray-700 tracking-wide">
        {`Faceless Channels On Auto-Pilot`.toUpperCase()}
      </p>
    </div>
  );
};

export default SectionHeader;
