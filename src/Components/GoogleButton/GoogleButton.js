import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import styles from "./GoogleButton.module.css";
import { loginWithGoogle } from "../../redux/operations/login";

const GoogleButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const responseGoogle = async (response) => {
    try {
      const { accessToken } = response;
      const body = {
        accessToken,
      };
      dispatch(loginWithGoogle(body, history));
    } catch (error) {
      console.log("GOOGLE LOGIN FAILED");
      console.error(error);
    }
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_ID}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          className={styles.google_button}
        ></button>
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      autoLoad={false}
    />
  );
};

export default GoogleButton;
