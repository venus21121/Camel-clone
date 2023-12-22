import React from "react";
import "./Home.css";
import Product from "./Product.js";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <h1>Popular Products</h1>
        <div className="product_items_row">
          <Product
            image="https://m.media-amazon.com/images/I/51kZmRLNSQL.jpg"
            title="learning Resources 3060 Farmers Market Color"
            b_price={17.49}
            l_price={45.99}
            a_price={30.09}
          />
          <Product
            image="https://m.media-amazon.com/images/I/314zK6twqQL.jpg"
            title="Krinner Tree Genie Tree Genie XXL Christmas"
            b_price={59.49}
            l_price={69.99}
            a_price={119.89}
          />
          <Product
            image="https://m.media-amazon.com/images/I/41rb9rk7TlL.jpg"
            title="Hape Pound & Tap Bench with Slide Out"
            b_price={12.39}
            l_price={32.99}
            a_price={30.62}
          />
          <Product
            image="https://m.media-amazon.com/images/I/51moCSQWOJS.jpg"
            title="Splendor Board Game (Base Game) - Strategy"
            b_price={18.39}
            l_price={44.99}
            a_price={33.78}
          />
          <Product
            image="https://m.media-amazon.com/images/I/41TDxvrTfQL.jpg"
            title="WORX WG509 12 Amp TRIVAC 3-in-1 Electric"
            b_price={64.99}
            l_price={98.98}
            a_price={90.27}
          />
        </div>
        <div className="product_items_row">
          <Product
            image="https://m.media-amazon.com/images/I/41ckHP3EdWL.jpg"
            title="Speedo Easy Long Sleeve Swim Shirt"
            b_price={19.75}
            l_price={23.7}
          />
          <Product
            image="https://m.media-amazon.com/images/I/319llKF8mML.jpg"
            title="Bumkins Disney Baby Bowl, Silicone Feeding"
            b_price={14.49}
            l_price={17.95}
          />
          <Product
            image="https://m.media-amazon.com/images/I/519D-NP7ChL.jpg"
            title="C.P.E Bach Edition by Diverse"
            b_price={59.99}
            l_price={63.42}
          />
          <Product
            image="https://m.media-amazon.com/images/I/31yL3E7rpLL.jpg"
            title="SHIMANO CURADO BFS XG Right"
            b_price={190.27}
            l_price={206.34}
          />
          <Product
            image="https://m.media-amazon.com/images/I/51-QAzhtjtL.jpg"
            title="SPLENDA MONK Fruit Liquid Zero Calorie"
            b_price={11.82}
            l_price={16.83}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
