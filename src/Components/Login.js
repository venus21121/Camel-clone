import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState(""); // storing current inserted email
  const [password, setPassword] = useState(""); // storing current inserted password

  // handle the case when the submit button is pressed
  // we can print out in the console for now.
  const handleSubmit = (e) => {
    e.preventDefault(); // to prevent from reloading the page and losing our current state
    console.log(email + password);
  };

  // check if both email and password are filled
  const isFromFilled = email.length > 0 && password.length > 0;

  return (
    <div className="login">
      <div className="login_container">
        <h1>Log In To Your Account</h1>
        <div className="login_input">
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
            <input type="submit" value="Log in" disabled={!isFromFilled} />
          </form>
          <button>Create Free Account</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
