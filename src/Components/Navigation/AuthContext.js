import React, { createContext, useContext, useState } from "react";

/* AuthContext: This is the context object created by createContext(). 
   The argument provided to createContext is the default value for the context. 
   This is what components will receive when they consume this context 
   if no provider is found in the component tree. Here, you have an object with 
   isAuthenticated set to false, and two placeholder functions for login and logout */
const AuthContext = createContext({
  // default values or functions that are placeholders, you implement the actual logic for those function inside the provider component.
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

/* Any component can easily access the authentication state and functions
   without directly interacting with the context API. */
export const useAuth = () => useContext(AuthContext);

/* AuthProvider: This is a React component that sserves as the provider for the AuthContext. 
   All children components inside this provider can access the context value */
export const AuthProvider = ({ children }) => {
  // useState(false) initializes the isAuthenticated state with fallse, indicating that the user is initially not logged in.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log("Authentication status:", isAuthenticated); // Monitor auth status

  // These function are defined to update the state
  const login = () => {
    console.log("Logging in");
    setIsAuthenticated(true);
  };
  const logout = () => {
    console.log("Logging out");
    setIsAuthenticated(false);
  };

  return (
    /*AuthContext.Provider: This component makes the isAuthenticated, login, and logout 
      available to any child component that calls the useAuth() hook. 
      children represents any child components nested within this provider, 
      allowing them to inherit this context.*/
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
