"use client";

import { createContext, useState, useContext } from "react";

export const FrontDataContext = createContext();

export const FrontDataProvider = ({ children }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  return (
    <FrontDataContext.Provider
      value={{
        sideMenuOpen,
        setSideMenuOpen,
      }}
    >
      {children}
    </FrontDataContext.Provider>
  );
};

export const useDataFrontContext = () => useContext(FrontDataContext);
