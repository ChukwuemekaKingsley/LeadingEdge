import React from "react";
import "./product-footer.scss";
const ProductFooter = () => {
  const iSELLlogo = require("../../../assets/isell-logo.png");
  return (
    <div className="product-footer">
      <div className="div-1">
        <img className="isell" src={iSELLlogo} alt="isell" />
        <p className="isell-text">
          <span className=" font-Cinzel font-semibold px-1">LEADING EDGE</span>{" "}
          gives you the building blocks to build a truly profitable business.
        </p>
      </div>
      <p className="copy-text">
        © Copyright 2022, All Rights Reserved by Leading Edge
      </p>
    </div>
  );
};

export default ProductFooter;
