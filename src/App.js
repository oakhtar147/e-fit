import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import Home from "containers/Home/Home";
import Cart from "containers/Cart/Cart";
import Auth from "containers/Auth/Auth";
import Browse from "components/Browse/Browse";
import { authPersistence } from "store/actions/";
import Logout from "containers/Auth/Logout/Logout";
import PurchaseProduct from "containers/PurchaseProduct/PurchaseProduct";

const browseByCategory = (category) => {
  return (props) => <Browse {...props} category={category} />;
};

const App = ({ isAuthenticated, tryAuthPersistence }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      tryAuthPersistence();
    }
  }, [isAuthenticated, tryAuthPersistence]);

  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/logout" exact component={Logout} />
        {isAuthenticated && <Route path="/cart" exact component={Cart} />}
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryAuthPersistence: () => dispatch(authPersistence()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
