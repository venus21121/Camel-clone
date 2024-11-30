import React, { useState } from "react";
import Product from "../Navigation/Product.js";
function Home({ h_products }) {
  const itemsToShow = 5; // Show 5 products at a time
  const amazonUrl = "https://www.amazon.com/dp/";
  const user = JSON.parse(localStorage.getItem("user"));

  // State to manage the index of the first product displayed
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate total number of slides
  const totalSlides = Math.ceil(h_products.length / itemsToShow);

  // Function to handle next product display
  const handleNext = () => {
    if (currentIndex + itemsToShow < h_products.length) {
      setCurrentIndex(currentIndex + itemsToShow);
    } else {
      setCurrentIndex(0); // Loop back to the start
    }
  };

  // Function to handle previous product display
  const handlePrev = () => {
    if (currentIndex - itemsToShow >= 0) {
      setCurrentIndex(currentIndex - itemsToShow);
    } else {
      setCurrentIndex(h_products.length - (h_products.length % itemsToShow)); // Loop to the end
    }
  };
  console.log("Current auth state:", user);

  return (
    <div className="home">
      <div className="home_container flex flex-col items-center p-4 bg-gray-100">
        {user ? <h1>Welcome {user}</h1> : <h1></h1>}
        {/* Added padding */}
        <h1 className="mb-4 text-2xl font-bold">Popular Products</h1>
        <div className="relative w-full max-w-screen-xl overflow-hidden p-4">
          {" "}
          {/* Added padding */}
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${(currentIndex / itemsToShow) * 100}%)`, // Adjust the transformation for full slides
            }}
          >
            {h_products.map((product, index) => (
              <div
                key={product.productId}
                className="w-1/5 flex-shrink-0 p-2 mx-auto"
              >
                {" "}
                {/* Smaller container */}
                <Product
                  id={product.productId}
                  image={product.imgUrl}
                  title={product.productName}
                  b_price={product.currentPrice}
                  url={amazonUrl + product.productSku}
                  sku={product.productSku}
                />
              </div>
            ))}
          </div>
          {/* Left Arrow */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            onClick={handlePrev}
          >
            &#10094; {/* Left arrow character */}
          </button>
          {/* Right Arrow */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            onClick={handleNext}
          >
            &#10095; {/* Right arrow character */}
          </button>
        </div>
        {/* Pagination Indicator */}
        <div className="mt-4">
          <p className="text-sm">
            {Math.floor(currentIndex / itemsToShow) + 1} of {totalSlides}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
