import axios from "axios";
import React, { useEffect, useState } from "react";
import "./productDetail.css";

function ProductDetail(props) {
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const userProduct = await axios.get("http://localhost:5000/items", {
        params: {
          productId: productId,
        },
      });

      setProduct(userProduct.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="productDetail">
      {Product.length === 1 ? (
        <div className="productDetail__container">
          <div className="productDetail__items">
            <div className="productDetail__itemsImage">
              <img src={Product[0].item.picture} alt="" />
            </div>
            <div className="productDetail__itemsInfo">
              <span>
                {Product[0].item.condition === "new" ? "nuevo" : "usado"} -{" "}
                {Product[0].item.sold_quantity} vendidos
              </span>
              <h2>{Product[0].item.title}</h2>
              <h1>
                ${" "}
                {Product[0].item.price.amount
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}{" "}
              </h1>
              <button className="productDetail__itemsInfoButton">
                comprar
              </button>
            </div>
          </div>
          <div className="productDetail__Description">
            <h2>Descripción del producto</h2>
            <span>{Product[0].item.description}</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductDetail;
