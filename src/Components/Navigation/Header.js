import React, { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { useAuth } from "./AuthContext";
import logo from "../../Assets/amaSave.png"; // Adjust the path as necessary
import axios from "axios";

function Header() {
  const { isAuthenticated, logout } = useAuth(); // Access authentication context
  const [search, setSearch] = useState("");
  const nav = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown
  const dropdownRef = useRef(null); // Reference for the dropdown

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = async () => {
    await axios.post("http://localhost:8080/user/logout");
    logout();
    console.log("User logged out");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // Check if search input is empty
    if (search.trim() === "") {
      return; // Exit the function early if the input is empty
    }

    console.log("User has searched " + search);
    try {
      const response = await axios.get(
        `http://localhost:8080/product/search?input=${search}`
      );
      if (Array.isArray(response.data)) {
        if (response.data.length === 1) {
          const productSku = response.data[0].productSku;
          nav(`/productpage?sku=${productSku}`);
        } else if (response.data.length > 1) {
          nav(`/search?sq=${search}`);
        } else {
          console.log("No products found");
        }
      } else {
        console.log("Unexpected response format");
      }
    } catch (err) {
      console.error("Error during search:", err);
      nav(`/error?sq=${search || "An error occurred"}`);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-[#232F3E] text-white shadow-md">
      <Link to="/">
        <img className="h-14" src={logo} alt="Logo" />
      </Link>

      <form className="flex flex-1 mx-4" onSubmit={handleSearch}>
        <input
          className="border border-gray-300 rounded-l-md p-2 w-full text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Find Amazon Products"
          id="search"
          name="search"
        />
        <button
          type="submit"
          className="bg-[#FF9900] text-white p-2 rounded-r-md"
        >
          <SearchIcon style={{ color: "white" }} />
        </button>
      </form>

      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center p-2 border border-gray-300 rounded-md focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
        >
          <PersonIcon />
          <ArrowDropDownIcon />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <div className="py-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Create Free Account
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
