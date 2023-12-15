import React from "react";
import "./Navbar.css";
import logo from "../../Assets/camel_logo.jpg";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} style={{ width: "50px", height: "auto" }}></img>
      </div>
      <div className="search">
        <div className="searchInputs">
          <form>
            <input type="search" placeholder="Search..."></input>

            <button type="submit">Search</button>
            <Button
              variant="contained"
              color="error"
              startIcon={<SearchIcon />}
            >
              Delete
            </Button>
          </form>
        </div>
      </div>
      <div className="nav-signin">
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
