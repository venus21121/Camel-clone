import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Navigation/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/register", {
        userEmail: email,
        password: password,
      });
      console.log("Register Successful", response.data);
      login();
      navigate("/");
    } catch (error) {
      console.error(
        "Register Error:",
        error.response ? error.response.data : error
      );
      setRegisterError(
        "This email is already registered. Please choose another one."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-4">
          Get started with a Free account
        </h1>
        {registerError && <p className="text-red-500 mb-4">{registerError}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Email Address:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              required
            />
          </label>
          <label className="block mb-2">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              required
            />
          </label>
          <button
            type="submit"
            className={`bg-blue-500 text-white p-2 rounded-md w-full ${
              !email || !password ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!email || !password}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
