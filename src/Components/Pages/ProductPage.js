import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const amazonUrl = "https://www.amazon.com/dp/";
  const location = useLocation();

  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };
  const productSku = getQueryParam("sku");

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

  return (
    <div className="product_page p-6 ">
      <div className="product_info_row flex items-start mb-4 ">
        <img
          className="w-48 h-48 object-contain rounded-lg mr-4" // Changed to object-contain
          src={product.imgUrl}
          alt={product.productName}
        />
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-green-600">
              ${product.currentPrice}
            </h2>
            <a
              className="link"
              href={amazonUrl + product.productSku}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="amazon_link bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full">
                View at Amazon
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-48">
          Create Price Watch
        </button>
      </div>
      <hr className="my-4" /> {/* Horizontal line for separation */}
      <div className="product_detail mt-4">
        <h3 className="text-xl font-semibold mb-2">Product Details</h3>
        <h4 className="text-lg font-medium">Product Group</h4>
        <p>Manufacturer Model Locale List Price EAN UPC SKU Last Update Scan</p>
      </div>
      <div className="amazon_price_history mt-4">
        <h3 className="text-xl font-semibold mb-2">Amazon Price History</h3>
        {/* Price history chart or data can be rendered here */}
      </div>
    </div>
  );
}

export default ProductPage;
