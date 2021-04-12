import React from "react";
import { connect } from "react-redux";

import styles from "./ProductCard.module.css";
import Button from "components/UI/Button/Button";
import { setAuthRedirect } from "store/actions/";

const ProductCard = (props) => {
  const { isAuthenticated, product } = props;

  const handleBuyProduct = () => {
    if (!isAuthenticated) {
      props.setAuthRedirect(`${props.match.url}/${product.id}`);
      props.history.push({ pathname: "/auth", state: { redirected: true } });
    } else {
      props.history.push(`${props.match.url}/${product.id}`);
    }
  };

  return (
    <div className={styles.ProductCard}>
      <img src={product.image} alt={`${product.name}`} />
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>{product.inStock ? "In Stock" : "Out of Stock"}</p>
      <Button
        variant="success"
        disabled={!product.inStock}
        onClick={handleBuyProduct}
      >
        Buy
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthRedirect: (purchaseProductRoute) =>
      dispatch(setAuthRedirect(purchaseProductRoute)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
