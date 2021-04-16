import * as actionTypes from "./actionTypes";
import axios from "axiosInstance";

const API_KEY = "AIzaSyC-l4T2wABAh01q96mRnxhj9-twyMPUhOs";
const SIGN_UP_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const LOGIN_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const userAuth = (idToken, localId) => {
  return {
    type: actionTypes.USER_AUTH,
    idToken,
    localId,
  };
};

const authError = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error,
  };
};

export const userLogout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("localId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.USER_LOGOUT,
  };
};

const authLogoutAsync = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => dispatch(userLogout()), expirationTime * 1000);
  };
};

export const userAuthAsync = (isLogin, email, password) => {
  return async (dispatch) => {
    const payload = { email, password, returnSecureToken: true };
    const ENDPOINT = isLogin ? LOGIN_ENDPOINT : SIGN_UP_ENDPOINT;
    try {
      const {
        data: { idToken, localId, expiresIn },
      } = await axios.post(ENDPOINT, payload);

      const expirationDate = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("localId", localId);
      localStorage.setItem("expirationDate", expirationDate);

      dispatch(userAuth(idToken, localId));
      dispatch(authLogoutAsync(expiresIn));
    } catch (err) {
      dispatch(authError(err.response));
    }
  };
};

export const setAuthRedirect = (route) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT,
    route,
  };
};

export const authPersistence = () => {
  return (dispatch) => {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) {
      return;
    }

    const expirationDate = new Date(+localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date().getTime()) {
      return;
    }

    const localId = localStorage.getItem("localId"); // we must have this
    dispatch(userAuth(idToken, localId));
    dispatch(
      authLogoutAsync((expirationDate.getTime() - new Date().getTime()) / 1000)
    );
  };
};
