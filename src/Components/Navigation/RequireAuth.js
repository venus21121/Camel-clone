import { useLocation, Navigate, Outlet } from "react-router-dom";

// This is used for Protected routes
const RequireAuth = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? ( // Check if the user is authenticated
    <Outlet /> // If authenticated, render the child routes
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  ); // Otherwise, redirect to login
};

export default RequireAuth;
