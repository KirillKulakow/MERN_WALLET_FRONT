import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import GoogleButton from "../../Components/GoogleButton/GoogleButton";
// import FacebookButton from "../../Components/FacebookButton/FacebookButton";
import styles from "./Registration.module.css";
import { signUp } from "../../redux/operations/registration";
import PasswordStrengthMeter from "../../Components/PasswordStrengthMeter/PasswordStrengthMeter";
import { useMediaQuery } from "react-responsive";
const formState = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

const Registration = () => {
  const [form, setForm] = useState(formState);
  const [emailValid, setEmailValid] = useState(true);
  const [passValid, setPassValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const errorMessage = useSelector((state) => state.session.user.error);

  const errHandler = (message) => {
    if(message.includes("Password")){
      return "Password not valid"
    } else {
      return message
    }
  };

  const inputHandler = (e) => {
    const { value, name } = e.target;
    const emailValidate = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passValidate = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
    // email validation
    if(name === "email"){
      if(!emailValidate.test(value)){
        console.log(emailValidate.test(value))
        setEmailValid(false);
      } else {
        setEmailValid(true);
      }
    };
    // password validation
    if(name === "password") {
      if(!passValidate.test(value)){
        setPassValid(false);
      } else {
        setPassValid(true);
      }
    }
    // name validation
    if(name === "name") {
      if(value.length < 3){
        setNameValid(false);
      } else {
        setNameValid(true);
      }
    }
    setForm({ ...form, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUp(form, history));
    setForm(formState);
  };
  const isTablet = useMediaQuery({ query: "(max-width: 1060px)" });
  const { email, password, confirmPassword, name } = form;

  return (
    <div className={styles.wrapper}>
      {!isTablet && (
        <div className={styles.wrapper_left}>
          <div className={styles.wrapper_phone}></div>
          <h2 className={styles.wrapper_left__title}>Finance App</h2>
        </div>
      )}

      <div className={styles.wrapper_right}>
        <div className={styles.wrapper_registration}>
          <div className={styles.logoWrapper}>
            <div className={styles.logo}></div>
            <h3 className={styles.title}>Wallet</h3>
          </div>
          <form onSubmit={formSubmit} className={styles.formWrapper}>
            <div className={styles.formGroup}>
              <div className={`${styles.icon} ${styles.icon_email}`}></div>
              <input
                type="email"
                className={`${styles.input} ${emailValid ? "" : styles.inputNotValid}`}
                placeholder="E-mail"
                autoComplete="on"
                onChange={inputHandler}
                name="email"
                value={email}
              />
            </div>
            <div className={styles.formGroup}>
            <div className={`${styles.icon} ${styles.icon_password}`}></div>
              <input
                type="password"
                className={`${styles.input} ${passValid ? "" : styles.inputNotValid}`}
                placeholder="Пароль"
                autoComplete="off"
                title={passValid ? "" : "Pass must have one or more number; two or more letter - upper and lower; one of special symbol like # @ ₴ ? $ 0; password length is more then 6 symbol"}
                onChange={inputHandler}
                name="password"
                value={password}
              />
            </div>
            <div className={styles.formGroupConfirm}>
              <div className={`${styles.icon} ${styles.icon_password}`}></div>
              <input
                type="password"
                className={styles.input}
                placeholder="Подтвердите пароль"
                autoComplete="off"
                onChange={inputHandler}
                name="confirmPassword"
                value={confirmPassword}
              />
            </div>
            <PasswordStrengthMeter password={form.password} />

            <div className={styles.formGroup}>
            <div className={`${styles.icon} ${styles.icon_name}`}></div>
              <input
                type="text"
                className={`${styles.input} ${nameValid ? "" : styles.inputNotValid}`}
                placeholder="Ваше имя"
                title={nameValid ? "" : "Name must be more then 3 letters"}
                onChange={inputHandler}
                name="name"
                value={name}
              />
            </div>
            <p className={styles.error}>
              {errorMessage ? errHandler(errorMessage.data.message) : ""}
            </p>
            <button type="submit" className={styles.button}>
              Регистрация
            </button>
            <div className={styles.login}>
              <Link to="/login">Войти</Link>
            </div>
          </form>
          {/* <div className={styles.login}>
            <div className={styles.social_box}>
              <GoogleButton />
              <FacebookButton />
            </div>
          </div> */}
        </div>
        {isTablet && (
          <h2 className={styles.wrapper_left__title}>Finance App</h2>
        )}
      </div>
    </div>
  );
};

export default Registration;