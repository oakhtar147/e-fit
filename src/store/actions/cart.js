import axios from "axiosInstance";

import * as actionTypes from "./actionTypes";

const populateCart = (cartProducts) => {
  return {
    type: actionTypes.POPULATE_CART,
    cartProducts,
  };
};

export const populateCartAsync = () => {
  return async (dispatch) => {
    try {
      const { data: cartProducts } = await axios.get(`cart.json`);
      dispatch(populateCart(cartProducts));
    } catch (err) {
      console.log(err);
    }
  };
};

const addToCart = (product) => {
  return {
    type: actionTypes.ADD_TO_CART,
    product,
  };
};

export const addToCartAsync = (product) => {
  return async (dispatch) => {
    try {
      await axios.post("cart.json", product);
      dispatch(addToCart(product));
    } catch (err) {
      console.log(err);
    }
  };
};

const removeFromCart = (productId) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    productId,
  };
};

export const removeFromCartAsync = (productId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`cart/${productId}.json`);
      dispatch(removeFromCart(productId));
    } catch (err) {
      console.log(err);
    }
  };
};
