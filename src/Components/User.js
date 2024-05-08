import React from "react";
import "./User.css";

function User() {
  return (
    <div className="user">
      <div className="login_container">
        <h1>Log In To Your Account</h1>
        <div className="login_input">
          <form>
            <label>
              Username or Email
              <input type="text" name="name" />
            </label>
            <label>
              Password
              <input type="password" name="password" />
            </label>
            <input type="submit" value="Log in" />
          </form>
          <button>Create Free Account</button>
        </div>
      </div>
    </div>
  );
}

export default User;
