import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductPage.css";

function ProductPage() {
  const [product, setProduct] = useState(null);

  // call backend. GetProductBy(id)

  const amazonUrl = "https://www.amazon.com/dp/";
  const location = useLocation();

  // Function to extract productId from query parameters
  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };
  const productSku = getQueryParam("sku");

  // Use the productSKu to fetch product details from API or state
  useEffect(() => {
    const fetchProductDetails = async (sku) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/${sku}`
        ); // Replace with your actual API endpoint
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (productSku) {
      fetchProductDetails(productSku);
    }
  }, [productSku]);

  if (!product) return <div>Loading...</div>; // Handle loading state

  // Handles param passed in url

  return (
    <div className="product_page">
      <div className="product_info_row">
        <img className="column" src={product.imgUrl}></img>
        <div className="column">
          <p>Amazon Price History</p>
          <div className="product_name">
            <h2> {product.productName}</h2>
          </div>
          <p>
            Sign up for price drop alerts by clicking a "Create Price Watch"
            button below
          </p>
        </div>
        <div className="column">
          <div className="product_price_column">
            <h2 className="product_current_price"> ${product.currentPrice}</h2>
            <a className="link" href={amazonUrl + product.productSku}>
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
