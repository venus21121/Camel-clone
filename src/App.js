import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/navigation/Header.js";
import HomePage from "./Components/features/HomePage.js";
import PricewatchPage from "./Components/features/PriceWatch/PricewatchPage.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Register from "./Components/features/Auth/Register.js";
import ProductPage from "./Components/features/Product/ProductPage.js";
import ProductSearchPage from "./Components/features/Product/ProductsSearchPage.js";
import ProductNotFoundPage from "./Components/features/Product/ProductNotFoundPage.js";
import RequireAuth from "./Components/navigation/RequireAuth.js";
import Login from "./Components/features/Auth/Login.js";
import { AuthProvider } from "./Components/features/Auth/AuthProvider.js";
import Admin from "./Components/features/Admin/AdminPage.js";
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
    //<AuthProvider>
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HomePage h_products={products} />
                </>
              }
            />
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
            {/* we want to protect these routes */}
            <Route element={<RequireAuth />}>
              <Route path="/pricewatch" element={<PricewatchPage />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
    //</AuthProvider>
  );
};

export default App;
