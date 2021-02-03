import "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import HeaderSearch from "./Components/HeaderSearch";
import Results from "./Components/Results";
import SearchResult from "./Service/SearchResult";
import { useState } from "react";
import history from "./history";
import Home from "./Components/Home";
import ProductDetail from "./Components/ProductDetail";

function App() {
  const [state, setState] = useState({
    results: [],
  });
  const [loading, setLoading] = useState(true);

  const onSearch = async (text) => {
    setLoading(true);
    const results = await SearchResult.get("/", {
      params: { s: text },
    });
    setLoading(false);
    setState((prevState) => {
      return { ...prevState, results: results };
    });
  };
  return (
    <Router history={history}>
      <div className="app">
        <Switch>
          <Route path="/search">
            <HeaderSearch onSearch={onSearch} />
            <Results results={state.results} loading={loading} />
          </Route>
          <Route
            path="/product/:productId"
            render={(props) => (
              <>
                <HeaderSearch onSearch={onSearch} />{" "}
                <ProductDetail {...props} />
              </>
            )}
          >
            {/* <HeaderSearch onSearch={onSearch} />
            <ProductDetail /> */}
          </Route>
          <Route path="/">
            <HeaderSearch onSearch={onSearch} />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
