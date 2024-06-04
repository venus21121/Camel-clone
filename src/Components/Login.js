import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import { useAuth } from "./AuthContext";

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

  // handle the case when the submit button is pressed
  // we can print out in the console for now.
  // send data to backend to check if login successful else throw exception
  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent from reloading the page and losing our current state
    console.log("Email: ", email, "Password: ", password);
    setLoginError(""); // Clear previous errors

    // Check if both email and password are filled
    // For Debugging

    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        userEmail: email,
        password: password,
      });
      // Assume the backend sends back a success response
      console.log("Login Successful", response.data);
      // Redirect to home or similar page
      handleLogin();
    } catch (error) {
      // Handle HTTP errors (e.g., 401, 403) here
      if (error.response && error.response.status === 401) {
        setLoginError("Incorrect username or password. Please try again.");
      } else {
        // Handle other kinds of errors (network error, server error, etc.)
        setLoginError("An error occurred. Please try again later.");
      }
      console.error("Login Error:", error);
    }
  };
  return (
    <div className="login">
      <div className="login_container">
        <h1>Log In To Your Account</h1>
        <div className="login_input">
          {loginError && <p className="login_error">{loginError}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Username or Email
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                name="email"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="**********"
                id="password"
                name="password"
              />
            </label>
            <input
              type="submit"
              value="Log in"
              disabled={!email || !password} // empty string is falsy
            />
          </form>
          <Link to="/register">
            <button>Create Free Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
