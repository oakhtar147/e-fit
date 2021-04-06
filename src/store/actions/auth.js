import * as actionTypes from "./actionTypes";
import axios from "axiosInstance";

const API_KEY = "AIzaSyC-l4T2wABAh01q96mRnxhj9-twyMPUhOs";
const SIGN_UP_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const LOGIN_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const userAuth = (idToken, localId, expiresIn) => {
  return {
    type: actionTypes.USER_AUTH,
    idToken,
    localId,
    expiresIn,
  };
};

export const userAuthAsync = (isLogin, email, password) => {
  return async (dispatch) => {
    const payload = { email, password };
    const ENDPOINT = isLogin ? LOGIN_ENDPOINT : SIGN_UP_ENDPOINT;
    try {
      const {
        data: { idToken, localId, expiresIn },
      } = await axios.post(ENDPOINT, payload);
      dispatch(userAuth(idToken, localId, expiresIn));
    } catch (err) {
      console.log(err);
    }
  };
};
