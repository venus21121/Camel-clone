import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//import "./ProductsSearchPage.css";

function ProductsSearchPage() {
  const amazonUrl = "https://www.amazon.com/dp/";

  const [products, setProducts] = useState([]);
  const location = useLocation();
  // Function to extract productId from query parameters
  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };
  const productKeywords = getQueryParam("sq");

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/product/search?input=${productKeywords}`
      ); // Replace with your actual API endpoint
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="products_search_page">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.productId}>
            <h2> {product.productName}</h2>
            <img className="column" src={product.imgUrl}></img>
            <h2 className="product_current_price"> ${product.currentPrice}</h2>
            <a className="link" href={amazonUrl + product.productSku}>
              <button className="amazon_link">View at Amazon</button>
            </a>
          </li>
        ))}
      </ul>{" "}
    </div>
  );
}

export default ProductsSearchPage;
