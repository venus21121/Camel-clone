import React from "react";
import { useState } from "react";
import "./Register.css";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
    // after submit form is pressed
    try {
      const response = await axios.post("http://localhost:8080/user/register", {
        email,
        password,
      });
      setSubmit(true);
      console.log("Register Successful", response.data);
    } catch (error) {
      console.error(
        "Register Error:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="register">
      <div className="register-containter">
        <h1>Get started with a Free account</h1>
        {submit && <h1>You have created a new account!</h1>}
        {/* Conditional rendering of the message */}
        <form onSubmit={handleSubmit}>
          <label>
            email:
            <input type="email" value={email} onChange={handleEmail}></input>
          </label>
          <label>
            password:
            <input
              type="password"
              value={password}
              onChange={handlePassword}
            ></input>
            <input type="submit" value="Create Account"></input>
          </label>
        </form>
      </div>
    </div>
  );
}

export default Register;
