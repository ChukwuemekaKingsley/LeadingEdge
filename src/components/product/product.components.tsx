import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../home/navbar/navbar.component";
// import Navbar from "../home/navbar/navbar.component";
import ProductDisplay from "./product-display/product-display";
import ProductFooter from "./product-footer/product-footer";
import ProductItems from "./product-items/product-items";

const Product = () => {
  const { state }: any = useLocation();
  const Navigate = useNavigate();
  return (
    <>
      {!state ? (
        (window.location.pathname = "/stores")
      ) : (
        <div>
          <Navbar isActive={true} state={state} />
          <ProductItems
            imageUrl={state?.businessLogoUrl}
            name={state?.businessName}
            description={state?.description}
          />
          <ProductDisplay products={state.products} />
          <ProductFooter />
        </div>
      )}
    </>
  );
};

export default Product;
