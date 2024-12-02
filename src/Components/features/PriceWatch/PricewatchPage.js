// User price Watch dashboard page
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Product from "../Product/Product";

function PricewatchPage() {
  const [userPriceWatches, setUserPriceWatches] = useState([]);
  const [editPriceWatchId, setEditPriceWatchId] = useState(null);
  const [desiredPrice, setDesiredPrice] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  const amazonUrl = "https://www.amazon.com/dp/";

  useEffect(() => {
    const getPriceWatches = async () => {
      try {
        const response = await axiosPrivate.get("/api/pricewatch");
        setUserPriceWatches(response.data);
      } catch (error) {
        console.error("Error fetching user price watches: ", error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getPriceWatches();
  }, [axiosPrivate, navigate, location]);

  const handleEdit = (priceWatch) => {
    setEditPriceWatchId(priceWatch.priceWatchId);
    setDesiredPrice(priceWatch.desiredPrice.toFixed(2)); // Pre-fill the input
  };

  const handleUpdate = async (priceWatch) => {
    if (parseFloat(desiredPrice) >= priceWatch.product.currentPrice) {
      alert(
        "Desired Price cannot be higher or equal to the current product price."
      );
      return;
    }

    try {
      await axiosPrivate.patch(
        `/api/pricewatch/update?priceWatchId=${priceWatch.priceWatchId}&newDesiredPrice=${desiredPrice}`
      );
      setUserPriceWatches((prev) =>
        prev.map((pw) =>
          pw.priceWatchId === priceWatch.priceWatchId
            ? { ...pw, desiredPrice: parseFloat(desiredPrice) }
            : pw
        )
      );
      setEditPriceWatchId(null); // Close the edit mode
    } catch (error) {
      console.error("Error updating price watch:", error);
    }
  };

  const handleDelete = async (priceWatch) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this price watch?"
    );
    if (userConfirmed) {
      try {
        await axiosPrivate.delete(
          `/api/pricewatch/delete?priceWatchId=${priceWatch.priceWatchId}`
        );
        setUserPriceWatches((prev) =>
          prev.filter((pw) => pw.priceWatchId !== priceWatch.priceWatchId)
        );
      } catch (error) {
        console.error("Error deleting price watch:", error);
      }
    }
  };

  return (
    <div className="pricewatch p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Price Watch List</h2>

      <section className="active-pricewatches mb-8">
        <h3 className="text-xl font-semibold text-green-600 mb-3">
          Active Price Watches
        </h3>
        {userPriceWatches.filter((pw) => pw.alertActive).length ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPriceWatches
              .filter((pw) => pw.alertActive)
              .map((priceWatch) => (
                <li
                  key={priceWatch.priceWatchId}
                  className="bg-white shadow-lg rounded-lg p-4"
                >
                  <div className="product-container">
                    <Product
                      id={priceWatch.product.productId}
                      image={priceWatch.product.imgUrl}
                      title={priceWatch.product.productName}
                      b_price={priceWatch.product.currentPrice}
                      url={`${amazonUrl}${priceWatch.product.productSku}`}
                      sku={priceWatch.product.productSku}
                    />
                    <div className="mt-3">
                      <p className="text-gray-700">
                        <span className="font-semibold">Desired Price:</span> $
                        {editPriceWatchId === priceWatch.priceWatchId ? (
                          <input
                            type="text"
                            value={desiredPrice}
                            onChange={(e) => setDesiredPrice(e.target.value)}
                            className="border border-gray-300 rounded p-1 w-24"
                            onKeyDown={(e) =>
                              ["e", "E", "+", "-"].includes(e.key) &&
                              e.preventDefault()
                            }
                          />
                        ) : (
                          priceWatch.desiredPrice.toFixed(2)
                        )}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Current Price:</span> $
                        {priceWatch.product.currentPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between mt-4">
                      {editPriceWatchId === priceWatch.priceWatchId ? (
                        <button
                          onClick={() => handleUpdate(priceWatch)}
                          className="text-blue-500 hover:underline"
                        >
                          Confirm
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(priceWatch)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(priceWatch)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">No active price watches</p>
        )}
      </section>

      <section className="price-drop-alerts">
        <h3 className="text-xl font-semibold text-orange-500 mb-3">
          Price Drop Alerts Sent
        </h3>
        {userPriceWatches.filter((pw) => !pw.alertActive).length ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPriceWatches
              .filter((pw) => !pw.alertActive)
              .map((priceWatch) => (
                <li
                  key={priceWatch.priceWatchId}
                  className="bg-gray-100 shadow-md rounded-lg p-4"
                >
                  <div className="product-container">
                    <Product
                      id={priceWatch.product.productId}
                      image={priceWatch.product.imgUrl}
                      title={priceWatch.product.productName}
                      b_price={priceWatch.product.currentPrice}
                      url={`${amazonUrl}${priceWatch.product.productSku}`}
                      sku={priceWatch.product.productSku}
                    />
                    <div className="mt-3">
                      <p className="text-gray-700">
                        <span className="font-semibold">Desired Price:</span> $
                        {priceWatch.desiredPrice.toFixed(2)}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Current Price:</span> $
                        {priceWatch.product.currentPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-600">
                        Alert sent: Price dropped to desired price.
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-gray-500">No price drop alerts sent</p>
        )}
      </section>
    </div>
  );
}

export default PricewatchPage;
