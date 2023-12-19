import React from "react";
import "./Home.css";
import Product from "./Product.js";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <h1>Popular Products</h1>
        <div className="product_items_row">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />

          {/* Product */}
          {/* Product */}
          {/* Product */}
          {/* Product */}
        </div>
        <div className="product_items_row">
          {/* Product */}
          {/* Product */}
          {/* Product */}
          {/* Product */}
          {/* Product */}
        </div>
      </div>
    </div>
  );
}

export default Home;
