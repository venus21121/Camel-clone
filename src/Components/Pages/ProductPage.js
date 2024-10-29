import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import PriceWatchForm from "../forms/PriceWatchForm";
function ProductPage() {
  const [product, setProduct] = useState(null);
  const amazonUrl = "https://www.amazon.com/dp/";
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  // PriceWatch Forms
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [targetPrice, setTargetPrice] = useState("");
  const [userPriceWatches, setUserPriceWatches] = useState([]);
  const [priceWatches, setPriceWatches] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  // Handles visibility of new PriceWatch Form
  const handleCreatePriceWatchClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Handles user price format
  const handlePriceChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const formattedValue = (parseFloat(numericValue) / 100).toFixed(2); // Convert to money format
    setTargetPrice(formattedValue);
  };

  // Create PriceWatch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    // Check if desired price is valid
    if (parseFloat(targetPrice) >= product.currentPrice) {
      setErrMsg(
        "Desired Price cannot be higher or equal to the current product price."
      );
    } else if (parseFloat(targetPrice) <= 0) {
      setErrMsg("Desired Price cannot be 0 or negative.");
    } else {
      try {
        const response = await axiosPrivate.post(
          "/api/pricewatch/create",
          {}, // No data in the body since you're using query params
          {
            params: {
              productId: product.productId,
              desiredPrice: targetPrice,
            },
            // other necessary fields like productId, userId, etc.
          }
        );
        console.log("Price Watch Created:", response.data);
        // Update the state with the new pricewatch
        setUserPriceWatches((prev) => [...prev, response.data]);
        setTargetPrice(""); // Reset the input field
      } catch (error) {
        console.error("Error creating price watch:", error);
      }
    }
  };

  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };
  const productSku = getQueryParam("sku");

  // Retrive product details
  useEffect(() => {
    const fetchProductDetails = async (sku) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/${sku}`
        ); // Replace with your actual API endpoint
        setProduct(response.data);
        console.log("Product detail: ", response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (productSku) {
      fetchProductDetails(productSku);
    }
  }, [productSku]);

  // Retrieve list of PriceWatch
  useEffect(() => {
    const fetchPriceWatches = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/pricewatch/list?productId=${product.productId}`
        );
        setPriceWatches(response.data); // Assume response.data is an array of price watches
      } catch (error) {
        console.error("Error fetching price watches:", error);
      }
    };
    if (product?.productId) {
      fetchPriceWatches();
    }
  }, [product?.productId, axiosPrivate]);

  if (!product) return <div>Loading...</div>; // Handle loading state

  return (
    <div className="product_page max-w-8xl p-6 mx-auto">
      {/* Product Info and Price Watch Row */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Info Section */}
        <div className="md:w-3/4 flex flex-col items-start bg-white shadow rounded-lg p-8">
          <div className="flex items-start mb-6">
            <img
              className="w-48 h-48 object-contain rounded-lg mr-6"
              src={product.imgUrl}
              alt={product.productName}
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{product.productName}</h2>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-green-600">
                  ${product.currentPrice}
                </h3>
                <a
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
          {/* Product Details */}
          <div className="product_detail mt-6">
            <h3 className="text-xl font-semibold mb-2">Product Details</h3>
            <p className="text-gray-700">
              Manufacturer, Model, Locale, List Price, EAN, UPC, SKU, Last
              Update, Scan
            </p>
          </div>
          {/* Amazon Price History Section */}
          <div className="amazon_price_history mt-6">
            <h3 className="text-xl font-semibold mb-2">Amazon Price History</h3>
            {/* You can add a price history chart or data table here */}
          </div>
        </div>

        {/* Price Watch Section */}
        <div className="md:w-1/4 bg-gray-100 shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Your Price Watches
          </h3>
          {/* Create Price Watch Button */}
          <div className="flex justify-start mb-4">
            <button
              onClick={handleCreatePriceWatchClick}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {isFormVisible ? "Cancel" : "Create Price Watch"}
            </button>
          </div>
          {/* New Price Watch Form */}
          {isFormVisible && (
            <div className="pricewatch_form bg-white shadow rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold mb-4">Set a Price Watch</h4>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  {errMsg && <p className="text-red-600 mb-4">{errMsg}</p>}

                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="targetPrice"
                  >
                    Desired Price:
                  </label>
                  <input
                    id="targetPrice"
                    type="text"
                    value={targetPrice}
                    onChange={handlePriceChange}
                    onKeyDown={(e) =>
                      ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                    }
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Enter your target price e.g., 50.00"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Save Price Watch
                </button>
              </form>
            </div>
          )}

          {/* Existing Price Watches */}
          <div className="space-y-4">
            {userPriceWatches.map((priceWatch) => (
              <PriceWatchForm key={priceWatch.id} priceWatch={priceWatch} />
            ))}
            {priceWatches.map((priceWatch) => (
              <PriceWatchForm
                key={priceWatch.id}
                priceWatch={priceWatch}
                // onUpdate={handleUpdate} // Pass the `handleUpdate` function as a prop
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
