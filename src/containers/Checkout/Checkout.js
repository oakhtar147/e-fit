import React, { useEffect } from "react";
import { connect } from "react-redux";

import styles from "./Checkout.module.css";
import Title from "components/UI/Title/Title";

const Checkout = (props) => {
  const products = JSON.parse(localStorage.getItem("cartProducts"));

  useEffect(() => {
    return () => localStorage.removeItem("cartProducts");
  }, []);

  // const listOfProducts = Object.keys(products).map((prod) => {
  //   return <li key={prod}>{prod.product.name}</li>;
  // });

  return (
    <div className={styles.Checkout}>
      <Title>Checkout</Title>
      <pre>{JSON.stringify(products, null, 2)}</pre>
      <ul>{listOfProducts}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.cart.cartProducts,
  };
};

export default connect(mapStateToProps)(Checkout);
