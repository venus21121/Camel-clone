import React from "react";
import "./Home.css";
import Product from "./Product.js";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <h1>Popular Products</h1>
      </div>
      <div className="product_items_row1">
        {/* Product */}
        <Product />
        {/* Product */}
        {/* Product */}
        {/* Product */}
        {/* Product */}
      </div>
      <div className="product_items_row2">
        {/* Product */}
        {/* Product */}
        {/* Product */}
        {/* Product */}
        {/* Product */}
      </div>
    </div>
  );
}

export default Home;
