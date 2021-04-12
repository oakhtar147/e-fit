import React from "react";
import { connect } from "react-redux";

import styles from "./CartProduct.module.css";
import Button from "components/UI/Button/Button";
import { removeFromCartAsync } from "store/actions/";

const CartProduct = (props) => {
  const { productDetails, removeFromCart } = props;
  return (
    <div className={styles.CartProduct}>
      <img src={productDetails.product.image} alt="" />
      <h3>Product: {productDetails.product.name}</h3>
      <p>Total: ${productDetails.product.price.toFixed(2)}</p>
      <p>Quantity: {productDetails.quantity}</p>
      <Button
        variant="danger"
        onClick={() => removeFromCart(productDetails.productId)}
      >
        Remove
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (productId) => dispatch(removeFromCartAsync(productId)),
  };
};

export default connect(null, mapDispatchToProps)(CartProduct);
