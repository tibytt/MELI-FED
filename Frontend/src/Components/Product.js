import React from "react";
import "./product.css";
import shippingIcon from "../Assets/ic_shipping.png";
import { Link } from "react-router-dom";

function Product(props) {
  const { product } = props;
  return (
    <div className="product">
      <div className="product__image">
        <Link to={`/product/${product.items[0].id}`}>
          <img src={product.items[0].picture} alt="" />
        </Link>
      </div>
      <div className="product__text">
        <span className="product__textPrice">
          ${" "}
          {product.items[0].price.amount
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
          {product.items[0].free_shipping ? (
            <img src={shippingIcon} alt="" />
          ) : (
            ""
          )}
        </span>
        <Link
          to={`/product/${product.items[0].id}`}
          className="product__textDescriptionLink"
        >
          <p className="product__textDescription">{product.items[0].title}</p>
        </Link>
      </div>
      <div className="product__location">
        <p className="product__locationText">{product.items[0].address}</p>
      </div>
    </div>
  );
}

export default Product;
