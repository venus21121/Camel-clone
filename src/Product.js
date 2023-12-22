import React from "react";
import "./Product.css";
function Product({ image, title, b_price, l_price, a_price }) {
  return (
    <div className="product">
      <img className="product_img" src={image} alt="" />
      <div className="product_container">
        <p>{title}</p>
        <div className="prices">
          <div className="best_price_text">
            <p>Best Price</p>
          </div>
          <div className="best_price">
            <small>$</small>
            <strong> {b_price}</strong>
          </div>
          <div className="list_price">
            <p>List price: ${l_price}</p>
          </div>
          <div className="avg_price">
            <p>Average price: ${a_price}</p>
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
