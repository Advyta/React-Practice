import { createContext, ReactNode, useContext, useState } from "react";
// import { Inputs } from "../Components/Login/Login";

// Project:     Reactjs practice
// Module:      Login Module
// Component:   Login Context
// Author:      Advyta
// Date:        October 31, 2024

// Logic:
// This context provider, `LoginProvider`, is responsible for managing and providing
// the login state (`isLoggedIn`) and its updater function (`setIsLoggedIn`).
// `useLoginContext` hook is used to check login status or update it.



// structure of the context value
interface loginContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

//  Initialize the login context
const loginContext = createContext<loginContextProps | undefined>(undefined);


// Custom hook to simplify context access within components
// Throws an error if accessed outside of `LoginProvider`
export const useLoginContext = (): loginContextProps => {
  const projectContext = useContext(loginContext);
  if (!projectContext) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
  return projectContext;
};

interface LoginProviderProps {
  children: ReactNode;
}
export const LoginProvider = ({ children }: LoginProviderProps) => {
  // Initialize `isLoggedIn` state and setter function
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <loginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </loginContext.Provider>
  );
};
