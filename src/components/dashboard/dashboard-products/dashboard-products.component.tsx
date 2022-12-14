// Copyright iSELL 💳 2022
// 17 U.S.C §§ 101-1511

//import relevant modules
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard-products.scss";
import { UilPlus } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { db } from "../../../firebase/firebase.utils";
import memoize from "lodash.memoize";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../../spinner/spinner";
import { Link } from "react-router-dom";

//import logo
const uploadImg = require("../../../assets/upload.png");

//JSX Components
const DashboardProducts = () => {
  const Navigate = useNavigate();

  const getUserUid = "TVTXSXazTZWg7PpZRkCtQ13tpGS85vXfKZ";
  const getUserUid1: any = useSelector(
    (state: RootState) => state.currentUser.currentUser
  );
  const [products, setProducts]: any = useState([]);
  const [loading, setloading] = useState(false);
  const [name, setName] = useState("");

  const getVendorProducts = memoize(async () => {
    await window.tronWeb.request({
      method: "tron_requestAccounts",
    });
    const { name, base58 } = window.tronWeb.defaultAddress;
    console.log("addr", base58);
    setloading(false);
    if (!base58) {
      return Navigate("/login");
    }
    const getDocRef = doc(db, "users", base58);
    if (!getDocRef) return;
    const userSnapshot = await getDoc(getDocRef);
    if (userSnapshot?.data()?.verification) {
      setProducts(userSnapshot.data()?.products);
      setName(userSnapshot.data()?.businessDetails?.business_name);
      setloading(true);
    }
  });

  useEffect(() => {
    getVendorProducts();
    // eslint-disable-next-line
  }, [getUserUid]);
  return (
    <div className="dashboard__upload">
      {!loading ? (
        <Spinner />
      ) : products.length > 0 && loading ? (
        <div className="vendor__products">
          <div className="add__products">
            <div className="products__main">
              <h2> Products</h2>
              <p>Store owned by {name}</p>
            </div>
            <Link to="/dashboard/create">
              <button>Add Item</button>
            </Link>
          </div>

          <div className="products">
            {products.map((product, i) => (
              <div key={i} className="dash-pro">
                <div className="product">
                  <p>{product?.stock}</p>
                  <img src={product?.imageUrl} />
                </div>
                <div className="product__details">
                  <h2>{product?.product}</h2>
                  <p>{product?.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="dashboard-products">
          <img src={uploadImg} alt="upload icon" />
          <h2> Start by uploading a product</h2>
          <p> Any product you upload on iSELL will live here.</p>
          <p> Start creating your Products.</p>

          <button className="product__button">
            <UilPlus className="uil__plus" />
            <Link to="/dashboard/create">
              <span> Create A Product</span>
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardProducts;
