import React, { useEffect } from "react";
import { connect } from "react-redux";

import styles from "./Cart.module.css";
import Title from "components/UI/Title/Title";
import CartProduct from "./CartProduct/CartProduct";
import { populateCartAsync } from "store/actions/";
import Spinner from "components/UI/Spinner/Spinner";
import Button from "components/UI/Button/Button";

const Cart = (props) => {
  const { populateCart, cartProducts } = props;

  useEffect(() => {
    populateCart();
  }, [populateCart]);

  const products =
    props.cartProducts &&
    Object.keys(cartProducts).map((item) => (
      <CartProduct
        key={item}
        productDetails={{ productId: item, ...cartProducts[item] }}
      />
    ));

  const renderElements = products && (
    <>
      {products}
      <Button variant="success">Checkout</Button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    populateCart: () => dispatch(populateCartAsync()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
