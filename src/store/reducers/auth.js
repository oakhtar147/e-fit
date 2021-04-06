import produce from "immer";
import * as actionTypes from "store/actions/actionTypes";

const INITIAL_STATE = {
  isAuthenticated: false,
  idToken: null,
  localId: null,
  expiresIn: 0,
};

export const authReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.USER_AUTH:
      draft.idToken = action.idToken;
      draft.localId = action.localId;
      draft.expiresIn = action.expiresIn;
      draft.isAuthenticated = true;
      break;
    default:
      return INITIAL_STATE;
  }
}, INITIAL_STATE);
