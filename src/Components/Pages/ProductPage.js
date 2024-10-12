import React from "react";
import "./ProductPage.css";
function ProductPage({ id, image, title, b_price, url }) {
  // call backend. GetProductBy(id)
  return (
    <div className="product_page">
      <div className="product_info_row">
        <img
          className="column"
          src="https://archive.org/download/no-photo-available/no-photo-available.png"
        ></img>
        <div className="column">
          <p>Amazon Price History</p>
          <div className="product_name">
            <h2> Product Name</h2>
          </div>
          <p>
            Sign up for price drop alerts by clicking a "Create Price Watch"
            button below
          </p>
        </div>
        <div className="column">
          <div className="product_price_column">
            <h2 className="product_current_price"> Price</h2>
            <a className="link" href={url}>
              <button className="amazon_link">View at Amazon</button>
            </a>
          </div>
        </div>
      </div>
      <button className="price_watch_button"> Create Price Watch</button>
      <div className="product_detail">
        <h3>Product Details</h3>
        <h4>Product group</h4>
        Manufactuerer Model Locale List Price EAN UPC SKU Last update scan
      </div>
    </div>
  );
}

export default ProductPage;
