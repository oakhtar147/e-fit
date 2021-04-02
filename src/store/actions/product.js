import axios from "../../axiosInstance";

import * as actionTypes from "./actionTypes";

const setProducts = (products) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    products,
  };
};

export const clearProducts = () => {
  return {
    type: actionTypes.CLEAR_PRODUCTS,
  };
};

export const setProductsAsync = (category) => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get(`products/${category}.json`);
      dispatch(setProducts(products));
    } catch (err) {
      console.log(err);
    }
  };
};

const getProduct = (product) => {
  return {
    type: actionTypes.GET_PRODUCT,
    product,
  };
};

export const clearPurchaseProduct = () => {
  return {
    type: actionTypes.CLEAR_PURCHASE_PRODUCT,
  };
};

export const getProductAsync = (category, productId) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(
        `products/${category}/${productId}.json`
      );
      dispatch(getProduct(product));
    } catch (err) {
      console.log(err);
    }
  };
};

export const incrementProductQuantity = (productPrice) => {
  return {
    type: actionTypes.INCREMENT_PRODUCT_QUANTITY,
    productPrice,
  };
};

export const decrementProductQuantity = (productPrice) => {
  return {
    type: actionTypes.DECREMENT_PRODUCT_QUANTITY,
    productPrice,
  };
};
