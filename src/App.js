import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "containers/Home/Home";
import Cart from "containers/Cart/Cart";
import Browse from "components/Browse/Browse";
import PurchaseProduct from "containers/PurchaseProduct/PurchaseProduct";

const browseByCategory = (category) => {
  return (props) => <Browse {...props} category={category} />;
};

const App = (props) => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cart" exact component={Cart} />
        <Route
          path="/products/footwear"
          exact
          render={browseByCategory("footwear")}
        />
        <Route
          path="/products/performance"
          exact
          render={browseByCategory("performance")}
        />
        <Route
          path="/products/supplements"
          exact
          render={browseByCategory("supplements")}
        />
        <Route
          path="/products/:category/:productId"
          exact
          render={(props) => <PurchaseProduct {...props} />}
        />
      </Switch>
    </>
  );
};

export default App;
