import produce from "immer";

import * as actionTypes from "store/actions/actionTypes";

const INITIAL_STATE = {
  cartProducts: null,
  ordered: false,
  error: null,
};

export const cartReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.POPULATE_CART:
      draft.cartProducts = action.cartProducts;
      draft.ordered = false;
      break;
    case actionTypes.REMOVE_FROM_CART:
      delete draft.cartProducts[action.productId];
      break;
    case actionTypes.ORDER_CART_PRODUCTS:
      draft.cartProducts = null;
      draft.ordered = true;
      break;
    case actionTypes.CLEAR_CART:
      return INITIAL_STATE;
    case actionTypes.CART_INTERACTION_FAILED:
      draft.error = action.error;
    // no default
  }
}, INITIAL_STATE);
