import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Navigation/Header.js";
import Home from "./Components/Pages/Home.js";
import Pricewatch from "./Components/Navigation/Pricewatch.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Components/Pages/Login.js";
import { AuthProvider } from "./Components/Navigation/AuthContext.js"; // Import the AuthProvider
import Register from "./Components/Pages/Register.js";
import ProductPage from "./Components/Pages/ProductPage.js";
import ProductSearchPage from "./Components/Pages/ProductsSearchPage.js";
import ProductNotFoundPage from "./Components/Pages/ProductNotFoundPage.js";

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
            <Route
              path="/register"
              element={
                <>
                  <Register />
                </>
              }
            />
            <Route
              path="/productpage"
              element={
                <>
                  <ProductPage />
                </>
              }
            />
            <Route
              path="/search"
              element={
                <>
                  <ProductSearchPage />
                </>
              }
            />
            <Route
              path="/error"
              element={
                <>
                  <ProductNotFoundPage />
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
