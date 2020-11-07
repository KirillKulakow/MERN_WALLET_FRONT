import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component, ...rest }) => {
  const isAuthEmail = useSelector((state) => state.session.user.status);
  const Interface = component;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthEmail && isAuthEmail !== "Verified") {return (<Redirect to="/verify" />)}
        else if(!isAuthEmail){return (<Redirect to="/login" />)}
        else return (<Interface {...props} />)
      }
      }
    />
  );
};
export default PrivateRoute;
