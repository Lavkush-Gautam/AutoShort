import React, { createContext, useContext, useState } from "react";
import AuthModal from "../components/AuthModal";

const AuthModalContext = createContext();

export const AuthModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultForm, setDefaultForm] = useState("login");

  const openAuthModal = (formType = "login") => {
    setDefaultForm(formType);
    setIsOpen(true);
  };

  const closeAuthModal = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider
      value={{ isOpen, defaultForm, openAuthModal, closeAuthModal }}
    >
      {children}
      <AuthModal
        isOpen={isOpen}
        onClose={closeAuthModal}
        defaultForm={defaultForm}
      />
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);
