import React from "react";
import style from "./Balance.module.css";
import { useSelector } from "react-redux";
import { sumParser } from "../../helpers/convertator";

const Balance = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <div className={style.navContainer}>
      <div className={style.balance}>
        <p>Баланс</p>
        {user.userBalance && <p>{`${sumParser(user.userBalance)}`} грн</p>}
      </div>
    </div>
  );
};

export default Balance;
