import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

//import "./ProductNotFoundPage.css";

function ProductNotFoundPage() {
  const location = useLocation();
  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  const errorMsg = getQueryParam("msg");

  return (
    <div className="product_notfound_page">
      {errorMsg || "Product not found"}
    </div>
  );
}

export default ProductNotFoundPage;
