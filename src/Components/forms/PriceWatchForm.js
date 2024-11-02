import React, { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// Price Watch Forms inside the product page
const PriceWatchForm = ({ priceWatch }) => {
  const [desiredPrice, setDesiredPrice] = useState(
    priceWatch.desiredPrice.toFixed(2)
  );
  const [errMsg, setErrMsg] = useState("");
  const axiosPrivate = useAxiosPrivate();

  // Handles user price format
  const handlePriceChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    const formattedValue = (parseFloat(numericValue) / 100).toFixed(2); // Convert to money format
    setDesiredPrice(formattedValue);
  };

  // Update PriceWatch
  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrMsg("");
    // Check if desired price is valid
    if (priceWatch?.priceWatchId) {
      if (parseFloat(desiredPrice) >= priceWatch.product.currentPrice) {
        setErrMsg(
          "Desired Price cannot be higher or equal to the current product price."
        );
      } else if (parseFloat(desiredPrice) <= 0) {
        setErrMsg("Desired Price cannot be 0 or negative.");
      } else {
        try {
          await axiosPrivate.patch(
            `/api/pricewatch/update?priceWatchId=${priceWatch.priceWatchId}&newDesiredPrice=${desiredPrice}`
          );
          window.location.reload();
        } catch (error) {
          console.error("Error updating price watches:", error);
        }
      }
    }
  };
  // Delete PriceWatch
  const handleDelete = async () => {
    // Check if pricewatch is loaded
    if (priceWatch?.priceWatchId) {
      // Send warning
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this price watch?"
      );
      if (userConfirmed) {
        try {
          await axiosPrivate.delete(
            `/api/pricewatch/delete?priceWatchId=${priceWatch.priceWatchId}`
          );
          window.location.reload();
        } catch (error) {
          console.error("Error deleting price watches:", error);
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-white shadow-lg rounded-lg px-6 py-6 w-full max-w-md mx-auto mt-4"
    >
      <h4 className="text-xl font-semibold mb-4 text-gray-700">Price Watch</h4>
      {errMsg && <p className="text-red-600 mb-4">{errMsg}</p>}

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Desired Price:
      </label>
      <input
        type="text"
        value={desiredPrice}
        onChange={handlePriceChange}
        onKeyDown={(e) =>
          ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
        }
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 text-gray-700"
        placeholder="e.g., 50.00"
      />

      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default PriceWatchForm;
