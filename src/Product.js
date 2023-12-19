import React from "react";
import "./Product.css";
function Product() {
  return (
    <div className="product">
      <img
        className="product_img"
        src="https://m.media-amazon.com/images/I/51kZmRLNSQL.jpg"
      />
      <div className="product_container">
        <p> Learning Resources 3060 Farmers Market Color sorting Set</p>
        <div className="prices">
          <div className="best_price_text">
            <p>Best Price</p>
          </div>
          <div className="best_price">
            <small>$</small>
            <strong> 17.49</strong>
          </div>
          <div className="list_price">
            <p>List price: $45.99</p>
          </div>
          <div className="avg_price">
            <p>Average price: $30.09</p>
          </div>
          <button className="amazon_link">View at Amazon</button>
        </div>
      </div>

      {/*price*/}
      {/*List price if any*/}
      {/*Average price*/}
      {/*view at amazon button*/}
    </div>
  );
}

export default Product;
