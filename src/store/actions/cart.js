import axios from "axiosInstance";

import * as actionTypes from "./actionTypes";

const populateCart = (cartProducts) => {
  return {
    type: actionTypes.POPULATE_CART,
    cartProducts,
  };
};

export const populateCartAsync = () => {
  return async (dispatch, getState) => {
    try {
      const { idToken, localId: userId } = getState().auth;
      const queryParams = `?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`;
      const { data: cartProducts } = await axios.get(
        `cart.json/${queryParams}`
      );
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
  return async (dispatch, getState) => {
    try {
      const { idToken, localId: userId } = getState().auth;
      await axios.post(`cart.json?auth=${idToken}`, {
        product,
        userId,
      });
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
  return async (dispatch, getState) => {
    try {
      const { idToken } = getState().auth;
      await axios.delete(`cart/${productId}.json?auth=${idToken}`);
      dispatch(removeFromCart(productId));
    } catch (err) {
      console.log(err);
    }
  };
};
