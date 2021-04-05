import produce from "immer";

import * as actionTypes from "store/actions/actionTypes";

const INITIAL_STATE = {
  cartProducts: null,
};

export const cartReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.POPULATE_CART:
      draft.cartProducts = action.cartProducts;
      break;
    case actionTypes.REMOVE_FROM_CART:
      delete draft.cartProducts[action.productId];
      break;
    default:
      return INITIAL_STATE;
  }
}, INITIAL_STATE);
