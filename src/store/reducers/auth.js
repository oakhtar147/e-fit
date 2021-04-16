import produce from "immer";
import * as actionTypes from "store/actions/actionTypes";

const INITIAL_STATE = {
  idToken: null,
  localId: null,
  authRedirect: "/",
  error: null,
};

export const authReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.USER_AUTH:
      draft.error = null;
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
    case actionTypes.AUTH_ERROR:
      draft.error = action.error;
      break;
    // no default
  }
}, INITIAL_STATE);
