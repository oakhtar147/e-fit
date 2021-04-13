import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import styles from "./Cart.module.css";
import Title from "components/UI/Title/Title";
import CartProduct from "./CartProduct/CartProduct";
import { populateCartAsync } from "store/actions/";
import Spinner from "components/UI/Spinner/Spinner";
import Button from "components/UI/Button/Button";
import Checkout from "containers/Checkout/Checkout";

const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const { isAuthenticated, populateCart, cartProducts } = props;

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
      <Button
        variant="success"
        onClick={() => props.history.push({ pathname: "/", hash: "browse" })}
      >
        Browse Products
      </Button>
    </>
  );

  return (
    <div className={styles.Cart}>
      <Title>My Cart</Title>
      {renderElements || <Spinner />}
      {showCheckout && <Checkout />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cart.cartProducts,
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    populateCart: () => dispatch(populateCartAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
