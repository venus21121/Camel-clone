import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

function Header() {
  return (
    <div className="header">
      <img
        className="logo"
        src="https://assets.camelcamelcamel.com/live-assets/camelcamelcamel-logo-2018-583259dd2c1880ff44d801e313ca1d885d2ea345690072a457c5af98b5ca513f.png"
      />
      <div className="search">
        <input className="search_input" type="text" />
        <SearchIcon className="search_icon" />
        {/*search icon*/}
      </div>
      <div className="dropdown">
        {/*header profile drop down for create acct and sign in*/}
        <button className="dropbtn">
          <PersonIcon className="person_icon" />
        </button>
        <div class="dropdown-content">
          <a href="#">Create Free Account</a>
          <a href="#">Sign In</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
