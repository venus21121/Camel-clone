import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // For navigating to logout

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  const isTokenExpired = (token) => {
    if (!token) return true; // Token is not present
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Check if token is expired
  };

  // Update your useEffect in AuthProvider
  useEffect(() => {
    console.log("localStroage: ", localStorage);

    const accessToken = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Check if the access token is expired
    if (accessToken) {
      if (isTokenExpired(accessToken)) {
        // Handle expired token
        // Remove from Local Storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Empty our context memory
        setAuth({});
        navigate("/login");
        console.log("Token is expired checked by frontened");
      } else {
        setAuth({ user, accessToken });
      }
    }
  }, [navigate]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
