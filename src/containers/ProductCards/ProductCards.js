import React, { useEffect } from "react";
import { connect } from "react-redux";

import styles from "./ProductCards.module.css";
import ProductCard from "./ProductCard/ProductCard";
import Spinner from "components/UI/Spinner/Spinner";
import { clearPurchaseProduct, setProductsAsync } from "store/actions/";

const ProductCards = (props) => {
  const { clearPurchaseProduct, setProducts, category } = props;

  useEffect(() => {
    clearPurchaseProduct();
    setProducts(category);
  }, [clearPurchaseProduct, setProducts, category]);

  const productCards =
    props.products &&
    Object.keys(props.products).map((prod) => (
      <ProductCard
        {...props}
        key={prod}
        category={props.category}
        product={{ id: prod, ...props.products[prod] }}
      />
    ));

  const renderElement = productCards || <Spinner />;

  return <div className={styles.ProductCards}>{renderElement}</div>;
};

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (category) => dispatch(setProductsAsync(category)),
    clearPurchaseProduct: () => dispatch(clearPurchaseProduct()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCards);
