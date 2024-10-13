import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import { useAuth } from "./AuthContext";
import axios from "axios";
// type rfce
function Header() {
  const { isAuthenticated, logout } = useAuth(); // Access authentication context
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  const handleLogout = async () => {
    await axios.post("http://localhost:8080/user/logout");
    logout();
    // Optionally navigate to login or root page
    console.log("User logged out");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // send the search value to backend /product/search
    console.log("User has searched " + search);
    try {
      const response = await axios.get(
        `http://localhost:8080/product/search?input=${search}`
      );
      console.log(response.data);
      if (Array.isArray(response.data)) {
        // One product is found
        if (response.data.length === 1) {
          const productSku = response.data[0].productSku;
          console.log("product sku is ", productSku);
          nav(`/productpage?sku=${productSku}`);
        } // List of products are found
        else if (response.data.length > 1) {
          nav(`/search?sq=${search}`);
        } else {
          console.log("No products found");
        }
      } else {
        console.log("Unexpected response format");
      }
    } catch (err) {
      if (err.response) {
        // The request was made, but the server responded with a status code
        // No products found
        console.log("Error response data:", err.response.data);
        nav(`/error?msg=${err.response.data}`);
      } else if (err.request) {
        // The request was made, but no response was received
        console.log("Error request:", err.request);
        alert("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", err.message);
        alert("An error occurred: " + err.message);
      }
    }
  };

  return (
    <div className="header">
      <a href="/">
        <img
          className="logo"
          src="https://assets.camelcamelcamel.com/live-assets/camelcamelcamel-logo-2018-583259dd2c1880ff44d801e313ca1d885d2ea345690072a457c5af98b5ca513f.png"
        />
      </a>

      <form className="search" onSubmit={handleSearch}>
        <input
          className="search_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Type product SKU"
          id="search"
          name="search"
        />
        <button type="submit">
          <SearchIcon />
        </button>
        {/*<SearchIcon className="search_icon" />}
        {/*search icon*/}
      </form>
      <div className="dropdown">
        {/*header profile drop down for create acct and sign in*/}
        <button className="dropbtn">
          <PersonIcon className="person_icon" />
          <ArrowDropDownIcon />
        </button>
        <div class="dropdown-content">
          {/*<Link to="/login">Sign In</Link>*/}
          <div className="navigation-links">
            {isAuthenticated ? (
              <>
                <Link> My Account</Link>
                <Link onClick={handleLogout}>Logout</Link>
              </>
            ) : (
              <>
                <Link to="/register">Create Free Account</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
