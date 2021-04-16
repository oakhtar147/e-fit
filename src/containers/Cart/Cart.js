import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import axios from "axiosInstance";

import styles from "./Cart.module.css";
import Title from "components/UI/Title/Title";
import CartProduct from "./CartProduct/CartProduct";
import { populateCartAsync } from "store/actions/";
import Spinner from "components/UI/Spinner/Spinner";
import Button from "components/UI/Button/Button";
import Checkout from "containers/Checkout/Checkout";
import withErrorHandler from "hoc/withErrorHandler/withErrorHandler";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { isAuthenticated, populateCart, cartProducts, ordered } = props;

  const orderSuccessfulFlashMessage = (
    <Alert severity="success" style={{ margin: "10px auto", width: "50%" }}>
      Your order has been successfully placed!
    </Alert>
  );

  useEffect(() => {
    isAuthenticated && populateCart();
  }, [populateCart, isAuthenticated]);

  const products =
    cartProducts &&
    Object.keys(cartProducts).map((item) => (
      <CartProduct
        key={item}
        productDetails={{ productId: item, ...cartProducts[item].product }}
      />
    ));

  const renderElements = products && (
    <>
      {products}
      <Button
        variant="success"
        onClick={() => setShowCheckout(true)}
        disabled={!products.length}
      >
        {products.length ? "Checkout" : "Cart is Empty"}
      </Button>
    </>
  );

  return (
    <div className={styles.Cart}>
      <Title>My Cart</Title>
      {ordered ? orderSuccessfulFlashMessage : renderElements || <Spinner />}
      {showCheckout && !ordered && <Checkout />}
      <Button
        variant="success"
        onClick={() => props.history.push({ pathname: "/", hash: "browse" })}
      >
        Browse Products
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.cartProducts,
    ordered: state.cart.ordered,
    isAuthenticated: state.auth.idToken !== null,
    error: state.cart.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    populateCart: () => dispatch(populateCartAsync()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Cart, axios));
