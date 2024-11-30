import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth"; // Import useAuth hook
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

const LOGIN_URL = "/auth/login"; // Your backend login URL

const Login = () => {
  const { auth, setAuth } = useAuth(); // Access setAuth from the context
  const navigate = useNavigate(); // Navigation after successful login
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // Redirect after login

  const userRef = useRef(); // For auto-focus on input
  const errRef = useRef(null); // Create a ref

  const [user, setUser] = useState(""); // Username or email
  const [pwd, setPwd] = useState(""); // Password
  const [errMsg, setErrMsg] = useState(""); // Error message

  useEffect(() => {
    if (auth?.user) {
      // Check if user is logged in
      navigate("/"); // Redirect to home page
    }
  }, [auth, navigate]);
  useEffect(() => {
    userRef.current.focus(); // Focus on username input on component load
  }, []);

  useEffect(() => {
    setErrMsg(""); // Clear error when user or pwd changes
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg(""); // Reset error message

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: user, password: pwd }),

        {
          headers: {
            "Content-Type": "application/json",
          },
          //withCredentials: true, // Use this if sending cookies
        }
      );
      console.log("Login Successful", response.data);
      console.log("response:", response);
      const accessToken = response?.data?.token; // Extract token
      console.log("Access Token; ", accessToken);

      setAuth({ user, accessToken }); // Update auth context
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("localStroage: ", localStorage);

      setUser(""); // Clear the form inputs
      setPwd("");
      navigate(from, { replace: true }); // Redirect to previous page or home
    } catch (err) {
      console.log("Error object:", err); // Add this for better insight

      if (!err?.response) {
        console.log("NO SERVER RESPOND");
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Incorrect username or password. Please try again.");
      } else if (err.response?.data?.message) {
        // Use the message from the server response if available
        setErrMsg(`Error: ${err.response.data.message}`);
      } else {
        setErrMsg("Login Failed");
      }
      // Focus on error message only if it's not null
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">Sign In</h1>
        {errMsg && <p className="text-red-500 mb-4">{errMsg}</p>}{" "}
        {/* Show error message if it exists */}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2" htmlFor="username">
            Username or Email
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              placeholder="youremail@gmail.com" // Optional placeholder for clarity
            />
          </label>

          <label className="block mb-2" htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              placeholder="**********" // Optional placeholder for clarity
            />
          </label>

          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded-md w-full ${
              !user || !pwd ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!user || !pwd} // Disable button if fields are empty
          >
            Sign In
          </button>
        </form>
        <Link to="/register" className="block mt-4 text-center text-blue-500">
          Need an Account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
