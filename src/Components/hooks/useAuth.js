import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

// This is used for saving context auth auth with access token and user email
const useAuth = () => {
  const { auth } = useContext(AuthContext);
  console.log("auth: ", auth);
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
  return useContext(AuthContext); // Returns the context object, including auth and setAuth
};

export default useAuth;
