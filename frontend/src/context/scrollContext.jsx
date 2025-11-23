import { createContext, useContext, useRef } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const presentRef = useRef(null);
  const videosRef = useRef(null);
  const workingRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <ScrollContext.Provider
      value={{ scrollToSection, presentRef, videosRef, workingRef, pricingRef, faqRef }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
