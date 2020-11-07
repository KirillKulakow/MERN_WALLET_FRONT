import React from "react";
import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { LogOutUser } from "../../redux/operations/login";
import { getFromLocaleStorage } from "../../helpers/storage";
import { paths } from "../../constants";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const token = JSON.parse(getFromLocaleStorage("persist:auth-token").token);

  const logOut = () => {
    dispatch(LogOutUser(token));
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper_logo}>
        <div className={styles.img_logo}></div>
        <a className={styles.title} href={paths.mainPage}>
          Wallet
        </a>
      </div>
      <div className={styles.wrapper_nav}>
        <p className={styles.user_name}>{user.name && `${user.name}`}</p>
        <div className={styles.wrapper_log_out} onClick={logOut}>
          <div className={styles.icon_log_out}></div>
          {!isMobile && <div className={styles.text_log_out}>Вийти</div>}
        </div>
      </div>
    </header>
  );
};
export default Header;
