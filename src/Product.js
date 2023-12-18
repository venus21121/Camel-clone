import React from "react";
import "./Product.css";
function Product() {
  return (
    <div className="product">
      <div className="product_container">
        {/*img*/}
        <img
          className="product_img"
          src="https://m.media-amazon.com/images/I/51kZmRLNSQL.jpg"
        />
        {/*title*/}
        <p> Learning Resources 3060 Farmers Market Color sorting Set</p>
        <small>$</small>
        <strong> 17.49</strong>
        <div className="list_price">
          <p>List price: $</p>
          <strong> 45.99</strong>
        </div>
        <div className="avg_price">
          <p>Average price: $</p>
          <strong> 30.09</strong>
        </div>
        <button className="amazon_link"> View at Amazon</button>
      </div>

      {/*price*/}
      {/*List price if any*/}
      {/*Average price*/}
      {/*view at amazon button*/}
    </div>
  );
}

export default Product;
