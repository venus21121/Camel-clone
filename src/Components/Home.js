import React from "react";
import "./Home.css";
import Product from "./Product.js";

function Home({ h_products }) {
  const itemsPerRow = 3;

  // Function to chunk array into rows of specified size
  const chunkArray = (array, size) => {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  };

  const productRows = chunkArray(h_products, itemsPerRow);

  return (
    <div className="home">
      <div className="home_container">
        <h1>Popular Products</h1>
        {productRows.map((row, rowIndex) => (
          <div key={rowIndex} className="product_items_row">
            {row.map((product) => (
              <Product
                id={product.id}
                image={product.imgUrl}
                title={product.title}
                b_price={product.price}
                url={product.productUrl}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
