import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import FlashMessage from "react-flash-message";

import styles from "./PurchaseProduct.module.css";
import Spinner from "components/UI/Spinner/Spinner";
import Title from "components/UI/Title/Title";
import Button from "components/UI/Button/Button";
import QuantityButton from "components/UI/Button/QuantityButton/QuantityButton";
import {
  getProductAsync,
  incrementProductQuantity,
  decrementProductQuantity,
  addToCartAsync,
} from "store/actions/";

const PurchaseProduct = (props) => {
  const [addedToCart, setAddedToCart] = useState(false);

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

  const handleAddedToCart = async () => {
    props.addToCart(productDetails);
    setAddedToCart(true);
  };

  const purchaseCard = product && (
    <div className={styles.PurchaseProduct}>
      <Title>{product.name}</Title>
      <img src={product.image} alt="" />
      <p>Quantity: {productDetails.quantity}</p>
      <QuantityButton
        mode="decrement"
        onClick={() => props.decrementProductQuantity(product.price)}
        disabled={productDetails.quantity <= 1 || addedToCart}
      />
      <QuantityButton
        mode="increment"
        onClick={() => props.incrementProductQuantity(product.price)}
        disabled={productDetails.quantity >= 10 || addedToCart}
      />
      <p>Price: ${productDetails.price.toFixed(2)}</p>

      {addedToCart ? (
        <>
          <div className={styles.container}>
            <FlashMessage duration={5000} persistOnHover>
              Product has been added to cart!
            </FlashMessage>
          </div>
          <Button
            variant="success"
            onClick={() => props.history.push(`/products/${category}`)}
          >
            Continue Shopping
          </Button>
          <Button variant="success" onClick={() => props.history.push(`/cart`)}>
            Checkout
          </Button>
        </>
      ) : (
        <Button variant="success" onClick={handleAddedToCart}>
          Add to Cart
        </Button>
      )}
    </div>
  );

  let renderElement = purchaseCard || <Spinner />;
  return <div>{renderElement}</div>;
};

const mapStateToProps = (state) => {
  return {
    productDetails: state.products.purchasingProduct,
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
    addToCart: (product) => dispatch(addToCartAsync(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseProduct);
