import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Containers/Login/Login";
import Registration from "./Containers/Registration/Registration";
import MainPage from "./Containers/MainPage/MainPage";
import AddTransaction from "./Components/AddTransaction/AddTransaction";
import Statistic from "./Components/Statistic/Statistic";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/operations/login";
import PrivateRoute from "./Containers/PrivateRoute/index";
import Verified from "./Components/Verified/Verified";
import { getFromLocaleStorage } from "./helpers/storage";

const App = () => {
  const dispatch = useDispatch();

  const token = JSON.parse(
    getFromLocaleStorage("persist:auth-token")
      ? getFromLocaleStorage("persist:auth-token").token
      : null
  );

  useEffect(() => {
    if (!token) return;

    dispatch(getUser());
  }, [dispatch, token]);

  return (
    <>
      <Switch>
        <Route path="/registration" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/verify" component={Verified} />
        <PrivateRoute path="/transaction" component={AddTransaction} />
        <PrivateRoute path="/sta" component={Statistic} />
        <PrivateRoute path="/" component={MainPage} />
      </Switch>
    </>
  );
};

export default App;
