import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { loginWithFacebook } from "../../redux/operations/login";
import styles from "./FacebookButton.module.css";
const FacebookButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const responseFacebook = async (response) => {
    try {
      const { accessToken } = response;
      const body = {
        accessToken,
      };
      dispatch(loginWithFacebook(body, history));
    } catch (error) {
      console.log("Facebook LOGIN FAILED");
      console.error(error);
    }
  };
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      fields="name,email,picture"
      callback={responseFacebook}
      autoLoad={false}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          className={styles.facebook_button}
        ></button>
      )}
    />
  );
};

export default FacebookButton;
