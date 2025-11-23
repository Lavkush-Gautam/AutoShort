import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const videoLinks = [
  "https://www.youtube.com/embed/ZV5yTm2pQ7A?autoplay=1&mute=1&loop=1&playlist=ZV5yTm2pQ7A",
  "https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&loop=1&playlist=tgbNymZ7vqY",
  "https://www.youtube.com/embed/ysz5S6PUM-U?autoplay=1&mute=1&loop=1&playlist=ysz5S6PUM-U",
  "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=1&mute=1&loop=1&playlist=jNQXAC9IVRw",
];

const VideosSection = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    // Duplicate content for infinite loop
    const content = slider.innerHTML;
    slider.innerHTML += content;

    const totalWidth = slider.scrollWidth / 2;

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(slider, {
      x: -totalWidth,
      ease: "linear",
      duration: 25, // faster scroll
    });

    // Pause animation on hover
    const pause = () => tl.pause();
    const play = () => tl.play();

    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", play);

    return () => {
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", play);
      tl.kill();
    };
  }, []);

  return (
    <section className="bg-linear-to-r from-pink-400 via-red-300 to-orange-200 py-16 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-800 drop-shadow-md">
        🎬 Faceless Videos in Action
      </h2>

      {/* GSAP Video Slider */}
      <div className="relative w-full overflow-hidden">
        <div ref={sliderRef} className="flex gap-6 w-max">
          {videoLinks.map((link, index) => (
            <div
              key={index}
              className="min-w-[200px] sm:min-w-[300px] md:min-w-[280px] rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500"
            >
              <iframe
                src={link}
                title={`Video ${index}`}
                className="w-full h-[180px] sm:h-[200px] md:h-90 object-cover rounded-2xl"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
