import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Header() {
  const { isAuthenticated, logout } = useAuth(); // Access authentication context
  const handleLogout = () => {
    logout();
    // Optionally navigate to login or root page
    console.log("User logged out");
  };
  return (
    <div className="header">
      <a href="/">
        <img
          className="logo"
          src="https://assets.camelcamelcamel.com/live-assets/camelcamelcamel-logo-2018-583259dd2c1880ff44d801e313ca1d885d2ea345690072a457c5af98b5ca513f.png"
        />
      </a>
      <div className="search">
        <input className="search_input" type="text" />
        <SearchIcon className="search_icon" />
        {/*search icon*/}
      </div>
      <div className="dropdown">
        {/*header profile drop down for create acct and sign in*/}
        <button className="dropbtn">
          <PersonIcon className="person_icon" />
          <ArrowDropDownIcon />
        </button>
        <div class="dropdown-content">
          <a href="#">Create Free Account</a>
          {/*<Link to="/login">Sign In</Link>*/}
          <div className="navigation-links">
            {isAuthenticated ? (
              <Link onClick={handleLogout}>Logout</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
