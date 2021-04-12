import produce from "immer";
import * as actionTypes from "store/actions/actionTypes";

const INITIAL_STATE = {
  idToken: null,
  localId: null,
  authRedirect: "/",
};

export const authReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.USER_AUTH:
      draft.idToken = action.idToken;
      draft.localId = action.localId;
      break;
    case actionTypes.SET_AUTH_REDIRECT:
      draft.authRedirect = action.route;
      break;
    case actionTypes.USER_LOGOUT:
      draft.idToken = null;
      draft.localId = null;
      draft.authRedirect = "/";
      break;
    // no default
  }
}, INITIAL_STATE);
