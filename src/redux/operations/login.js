import { paths } from "../../constants";
const {
  loginToWallet,
  loginToWalletWithGoogle,
  loginToWalletWithFacebook,
  getCurrentUser,
  setAuthToken,
  logoutFromWallet,
  clearAuthToken,
} = require("../../api/walletServices");
const {
  loginUser,
  loginUserWithGoogle,
  loginUserWithFacebook,
  userError,
  userLogOut,
  getCurrentUserWithToken,
} = require("../actions/user");

export const createUserLogin = (formData, history) => async (dispatch) => {
  try {
    const loginResult = await loginToWallet(formData);
    const user = loginResult.data;
    dispatch(loginUser(user));
    history.push(paths.mainPage);
  } catch (error) {
    dispatch(userError(error));
  }
};

export const loginWithGoogle = (formData, history) => async (dispatch) => {
  try {
    const loginResult = await loginToWalletWithGoogle(formData);
    const user = loginResult.data;
    dispatch(loginUserWithGoogle(user));
    history.push(paths.mainPage);
  } catch (error) {
    dispatch(userError(error));
  }
};

export const loginWithFacebook = (formData, history) => async (dispatch) => {
  try {
    const loginResult = await loginToWalletWithFacebook(formData);

    const user = loginResult.data;
    dispatch(loginUserWithFacebook(user));
    history.push(paths.mainPage);
  } catch (error) {
    dispatch(userError(error));
  }
};

export const getUser = () => async (dispatch, getState) => {
  try {
    const token = getState().session.token;
    setAuthToken(token);
    const user = await getCurrentUser();

    dispatch(getCurrentUserWithToken(user.data[0]));
    console.log(user.data);
  } catch (error) {
    if (error.response.status !== 500) {
      dispatch(userError(error));
    }
  }
};

export const LogOutUser = (token) => async (dispatch) => {
  try {
    setAuthToken(token);

    await logoutFromWallet();

    dispatch(userLogOut());
  } catch (error) {
    dispatch(userError(error));
  } finally {
    clearAuthToken();
  }
};
