import React, { useEffect } from "react";
import { connect } from "react-redux";

import styles from "./PurchaseProduct.module.css";
import Spinner from "components/UI/Spinner/Spinner";
import Title from "components/UI/Title/Title";
import {
  getProductAsync,
  incrementProductQuantity,
  decrementProductQuantity,
} from "store/actions/product";
import QuantityButton from "components/UI/Button/QuantityButton/QuantityButton";

const PurchaseProduct = (props) => {
  const { category, productId } = props.match.params;
  const {
    getProduct,
    productDetails: { product },
    productDetails,
  } = props;

  useEffect(() => getProduct(category, productId), [
    productId,
    getProduct,
    category,
  ]);

  const purchaseCard = product && (
    <div className={styles.PurchaseProduct}>
      <Title>{product.name}</Title>
      <div className={styles.container}>
        <img src={product.image} alt="" />
        <p>Quantity: {productDetails.quantity}</p>
        <QuantityButton
          mode="decrement"
          onClick={() => props.decrementProductQuantity(product.price)}
          disabled={productDetails.quantity <= 1}
        />
        <QuantityButton
          mode="increment"
          onClick={() => props.incrementProductQuantity(product.price)}
          disabled={productDetails.quantity >= 10}
        />
        <p>Price: ${productDetails.price}</p>
      </div>
    </div>
  );

  let renderElement = purchaseCard || <Spinner />;
  return <div>{renderElement}</div>;
};

const mapStateToProps = (state) => {
  return {
    productDetails: state.purchasingProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProduct: (category, productId) =>
      dispatch(getProductAsync(category, productId)),
    incrementProductQuantity: (productPrice) =>
      dispatch(incrementProductQuantity(productPrice)),
    decrementProductQuantity: (productPrice) =>
      dispatch(decrementProductQuantity(productPrice)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseProduct);
