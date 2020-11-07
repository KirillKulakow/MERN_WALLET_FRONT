import React from "react";
import style from "./Navigation.module.css";
import { useLocation, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = () => {
  const location = useLocation();
  const user = useSelector((state) => state.session.user);

  return (
    <div>
      <div className={style.pc}>
        <div className={style.navContainer}>
          <NavLink
            to={{ pathname: `/`, state: { from: location } }}
            className={`${style.navItem_link} ${style.navItem_link_main}`}
            activeClassName={style.navItem_link_active}
            exact
          >
            Главная
          </NavLink>
          <NavLink
            to={{ pathname: `/statistic`, state: { from: location } }}
            className={`${style.navItem_link} ${style.navItem_link_statistic}`}
            activeClassName={style.navItem_link_active}
            exact
          >
            Статистика
          </NavLink>
        </div>
      </div>

      <div className={style.tab}>
        <div className={style.tab_container}>
          <NavLink
            to={{ pathname: `/`, state: { from: location } }}
            className={`${style.tab_navItem} ${style.tab_main_icon}`}
            activeClassName={`${style.tab_navItem_active} ${style.tab_main_icon_active}`}
            exact
          >
            Главная
          </NavLink>
          <NavLink
            to={{ pathname: `/statistic`, state: { from: location } }}
            className={`${style.tab_navItem} ${style.tab_statistic_icon}`}
            activeClassName={`${style.tab_navItem_active} ${style.tab_statistic_icon_active}`}
            exact
          >
            Статистика
          </NavLink>
          <NavLink
            to={{ pathname: `/currency`, state: { from: location } }}
            className={`${style.tab_navItem} ${style.tab_currency_icon} ${style.mr}`}
            activeClassName={`${style.tab_navItem_active} ${style.tab_currency_icon_active}`}
            exact
          >
            Курс валют
          </NavLink>
          <div className={style.tab_balance}>
            <p>Баланс </p>
            <p className={style.userBalance}>
              {user.userBalance && `: ${user.userBalance} грн`}
            </p>
          </div>
        </div>
      </div>

      <div className={style.mob}>
        <div className={style.mob_container}>
          <NavLink
            to={{ pathname: `/`, state: { from: location } }}
            className={`${style.mob_navItem} ${style.mob_main_icon} `}
            activeClassName={`${style.mob_navItem_active} ${style.mob_main_icon_active}`}
            exact
          ></NavLink>
          <NavLink
            to={{ pathname: `/statistic`, state: { from: location } }}
            className={`${style.mob_navItem}  ${style.mob_statistic_icon}`}
            activeClassName={`${style.mob_navItem_active} ${style.mob_statistic_icon_active}`}
            exact
          ></NavLink>
          <NavLink
            to={{ pathname: `/currency`, state: { from: location } }}
            className={`${style.mob_navItem} ${style.mob_currency_icon}`}
            activeClassName={`${style.mob_navItem_active} ${style.mob_currency_icon_active}`}
            exact
          ></NavLink>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
