import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header.js";
import Home from "./Components/Home.js";
import Pricewatch from "./Components/Pricewatch.js";
import { useState, useEffect } from "react";
import axios from "axios";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
