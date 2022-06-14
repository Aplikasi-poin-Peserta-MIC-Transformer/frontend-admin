import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from  "../context/authContext";

const PrivateRoute = ({ exact, component: Component, ...rest }) => {
  const { isAuthenticated } = useAuthContext();
  return (
    <Route
      exact={exact ? true : false}
      rest
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} {...rest}></Component>
        ) : (
          <Redirect to={`${process.env.PUBLIC_URL}/auth-login`}></Redirect>
        )
      }
    ></Route>
  )
};

export default PrivateRoute;
