import React from "react";
import Product from "./Product";
import "./results.css";
import noResultImg from "../Assets/noResultsImg.png";

import CircularProgress from "@material-ui/core/CircularProgress";

function Results({ results, loading }) {
  let data = [];
  if (results.data) {
    data = results.data || [];
  }
  console.log("hola", data);
  // console.log(results.data);
  return (
    <div className="results">
      {loading ? (
        <div className="results__spinner">
          <CircularProgress />
        </div>
      ) : data.length !== 0 ? (
        data.map((item) => <Product key={item.items[0].id} product={item} />)
      ) : (
        <div className="results__noResults">
          <img src={noResultImg} alt="" />
        </div>
      )}
    </div>
  );
}

export default Results;
