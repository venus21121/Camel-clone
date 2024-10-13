import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../Navigation/AuthContext";

function Login() {
  const [email, setEmail] = useState(""); // storing current inserted email
  const [password, setPassword] = useState(""); // storing current inserted password
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate(); // For redirection

  const handleLogin = () => {
    login();
    navigate("/");
    console.log("user logged in");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email: ", email, "Password: ", password);
    setLoginError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        userEmail: email,
        password: password,
      });
      console.log("Login Successful", response.data);
      handleLogin();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError("Incorrect username or password. Please try again.");
      } else {
        setLoginError("An error occurred. Please try again later.");
      }
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">Log In To Your Account</h1>
        {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2" htmlFor="email">
            Username or Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
            />
          </label>
          <label className="block mb-2" htmlFor="password">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="**********"
              id="password"
              name="password"
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
            />
          </label>
          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded-md w-full ${
              !email || !password ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!email || !password}
          >
            Log in
          </button>
        </form>
        <Link to="/register" className="block mt-4 text-center text-blue-500">
          Create Free Account
        </Link>
      </div>
    </div>
  );
}

export default Login;
