import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link
import axios from "axios";

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
  }, [productKeywords]); // Add productKeywords as a dependency

  return (
    <div className="products_search_page p-4 ">
      <h1 className="text-2xl font-bold mb-6 ">
        Results for "{productKeywords}"
      </h1>
      <ul>
        {products.map((product) => (
          <li
            key={product.productId}
            className="flex items-center border border-gray-200 rounded-lg p-4 mb-4 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {/* Make the entire product item clickable */}
            <Link
              to={`/productpage?sku=${product.productSku}`} // Navigate to ProductPage with sku as a query parameter
              className="flex items-center flex-1" // Ensures full item is clickable
            >
              <img
                className="w-24 h-24 object-contain rounded-md mr-4"
                src={product.imgUrl}
                alt={product.productName}
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">
                  {product.productName}
                </h2>
                <h2 className="text-md font-bold text-green-600 mb-4">
                  ${product.currentPrice}
                </h2>
                <a
                  href={amazonUrl + product.productSku}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                    View at Amazon
                  </button>
                </a>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsSearchPage;
