import React from "react";
import { Link } from "react-router-dom";
import logoML from "../Assets/Logo_ML.png";
import "./headerSearch.css";
import SearchIcon from "@material-ui/icons/Search";
import { useState, useEffect } from "react";

import history from "../history";

function HeaderSearch(props, { location }) {
  const { onSearch } = props;
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(document.location.search.substring(1));
    const s = params.get("s");
    setSearchText(s ? s : searchText);
    onSearch(s ? s : searchText);

    //eslint-disable-next-line
  }, []);

  const handleInput = function (e) {
    const text = e.target.value;

    setSearchText(text);
  };

  const submitAction = function (e) {
    e.preventDefault();
    history.push("/search?s=" + searchText);
    onSearch(searchText);
  };

  return (
    <nav className="header">
      <Link to="/">
        <img className="header__logo" src={logoML} alt="" />
      </Link>
      <div className="header__search">
        <form onSubmit={submitAction}>
          <input
            type="text"
            onChange={handleInput}
            value={searchText}
            placeholder="Nunca dejes de buscar"
            className="header__searchInput"
          />
          <button className="header__searchButton" type="submit">
            <SearchIcon className="header__searchIcon" />
          </button>
        </form>
      </div>
    </nav>
  );
}

export default HeaderSearch;
