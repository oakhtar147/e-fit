import React, { useEffect } from "react";
import { connect } from "react-redux";

import styles from "./Cart.module.css";
import Title from "components/UI/Title/Title";
import CartProduct from "./CartProduct/CartProduct";
import { populateCartAsync } from "store/actions/";
import Spinner from "components/UI/Spinner/Spinner";
import Button from "components/UI/Button/Button";

const Cart = (props) => {
  const { isAuthenticated, populateCart, cartProducts } = props;

  useEffect(() => {
    isAuthenticated && populateCart();
  }, [populateCart, isAuthenticated]);

  const handleCheckoutRender = () => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    props.history.push("/checkout");
  };

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
        onClick={handleCheckoutRender}
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
