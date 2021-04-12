import produce from "immer";
import * as actionTypes from "store/actions/actionTypes";

const INITIAL_STATE = {
  products: null,
  purchasingProduct: {
    product: null,
    quantity: 1,
    price: 0,
  },
};

export const productReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      draft.products = action.products;
      break;
    case actionTypes.CLEAR_PRODUCTS:
      draft.products = null;
      break;
    case actionTypes.CLEAR_PURCHASE_PRODUCT:
      draft.purchasingProduct.product = null;
      draft.purchasingProduct.quantity = 1;
      break;
    case actionTypes.GET_PRODUCT:
      draft.purchasingProduct.product = action.product;
      draft.purchasingProduct.price = action.product.price;
      break;
    case actionTypes.INCREMENT_PRODUCT_QUANTITY:
      draft.purchasingProduct.quantity < 10 &&
        draft.purchasingProduct.quantity++;
      draft.purchasingProduct.price =
        draft.purchasingProduct.quantity * action.productPrice;
      break;
    case actionTypes.DECREMENT_PRODUCT_QUANTITY:
      draft.purchasingProduct.quantity > 1 &&
        draft.purchasingProduct.quantity--;
      draft.purchasingProduct.price =
        draft.purchasingProduct.quantity * action.productPrice;
      break;
    case actionTypes.ADD_TO_CART:
      draft.purchasingProduct.product = action.product.product;
      break;
    // no default
  }
}, INITIAL_STATE);
