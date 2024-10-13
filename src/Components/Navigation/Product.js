import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

function Product({ id, image, title, b_price, url, sku }) {
  return (
    <Link
      to={`/productpage?sku=${sku}`}
      className="product bg-white shadow-md rounded-lg p-4 block hover:shadow-lg transition-shadow duration-300"
    >
      <img
        className="product_img w-full h-40 object-contain mb-4" // Adjust height to fit smaller container
        src={image}
        alt={title}
      />
      <div className="product_container">
        <p
          className="text-lg font-semibold mb-2 truncate transition-all duration-300"
          title={title} // Show full title on hover
        >
          {title}
        </p>

        <div className="prices space-y-2">
          <div className="best_price_text text-sm text-gray-600">
            <p>Best Price</p>
          </div>

          <div className="best_price flex items-center text-xl font-bold text-green-600">
            <small className="mr-1">$</small>
            <strong>{b_price}</strong>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="link block mt-4"
          >
            <button className="amazon_link bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full">
              View at Amazon
            </button>
          </a>
        </div>
      </div>
    </Link>
  );
}

export default Product;
