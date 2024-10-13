import React from "react";
import "./Home.css";
import Product from "../Navigation/Product.js";

function Home({ h_products }) {
  const itemsPerRow = 3;

  // Function to chunk array into rows of specified size
  const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  };

  const productRows = chunkArray(h_products, itemsPerRow);
  const amazonUrl = "https://www.amazon.com/dp/";

  return (
    <div className="home">
      <div className="home_container">
        <h1>Popular Products</h1>
        {productRows.map((row, rowIndex) => (
          <div key={rowIndex} className="product_items_row">
            {row.map((product) => (
              <Product
                id={product.productId}
                image={product.imgUrl}
                title={product.productName}
                b_price={product.currentPrice}
                url={amazonUrl + product.productSku}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
