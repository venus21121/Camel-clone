import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.js";
import Home from "./Components/Home.js";
import Pricewatch from "./Components/Pricewatch.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Components/Login.js";
import { AuthProvider } from "./Components/AuthContext"; // Import the AuthProvider

const App = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/product");
      console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AuthProvider>
      <div className="app">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/pricewatch"
              element={
                <>
                  <Pricewatch />
                </>
              }
            />
            {/* Home // the components below header*/}
            <Route
              path="/"
              element={
                <>
                  <Home h_products={products} />
                </>
              }
            />
            {/*login route*/}
            <Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;
