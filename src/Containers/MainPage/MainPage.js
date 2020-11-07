import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Switch, Route, Redirect } from "react-router-dom";

import styles from "./MainPage.module.css";

import Navigation from "../../Components/Navigation/Navigation";
import TableTransaction from "../../Components/TableTransaction/TableTransaction";
import Currency from "../../Components/Currency/Currency";
import Balance from "../../Components/Balance/Balance";
import Header from "../../Components/Header/Header";
import AddTransaction from "../../Components/AddTransaction/AddTransaction";
import Statistic from "../../Components/Statistic/Statistic";
import Loading from "../../Components/Loader/Loader";

import { getUserTransactions } from "../../redux/operations/transactions";


const MainPage = (props) => {
  const loader = useSelector((state) => state.loader);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserTransactions());
  }, [dispatch]);

  const modalOpener = () => {
    if (modalOpen) return;
    setModalOpen(true);
  };

  const modalCloser = () => {
    if (!modalOpen) return;
    setModalOpen(false);
  };

  const isDesctop = useMediaQuery({ query: "(max-width: 1279px)" });

  return (
    <div className={modalOpen ? styles.noScroll : styles.wrapper}>
      <div className={styles.mainPage}>
        <Header />
        <Navigation />
        <Balance />
        <div className={styles.mainData}>
          <Switch>
            <Route
              path={`${props.match.path}/`}
              render={() => (
                <TableTransaction
                  modalOpener={modalOpener}
                  modalOpen={modalOpen}
                />
              )}
            />
            <Route
              path={`${props.match.path}statistic`}
              component={Statistic}
            />
            {isDesctop ? (
              <Route
                path={`${props.match.path}currency`}
                component={Currency}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Switch>
        </div>
        <div className={styles.blockForMobileButton}></div>
        <div className={styles.currency}>
          <Currency />
        </div>
        {modalOpen && <AddTransaction modalCloser={modalCloser} />}
        {loader && <Loading />}
      </div>
    </div>
  );
};

export default MainPage;
