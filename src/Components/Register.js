import React from "react";
import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate(); // For redirection

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    login();
    navigate("/");
    console.log("New user registered");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
    // after submit form is pressed
    try {
      const response = await axios.post("http://localhost:8080/user/register", {
        userEmail: email,
        password: password,
      });
      console.log("Register Successful", response.data);
      handleRegister();
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
    <div className="register">
      <div className="register_container">
        <h1>Get started with a Free account</h1>
        {registerError && <p className="register_error">{registerError}</p>}
        {/* Conditional rendering of the message */}
        <div className="register_input">
          <form onSubmit={handleSubmit}>
            <label>
              Email Address:
              <input type="email" value={email} onChange={handleEmail}></input>
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={handlePassword}
              ></input>
              <input
                type="submit"
                value="Create Account"
                disabled={!email || !password}
              ></input>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
