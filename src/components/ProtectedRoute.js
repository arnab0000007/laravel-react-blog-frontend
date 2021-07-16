import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
export const ProtectedRoute = ({ comp: Component, ...rest }) => {
  const { loggedInUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !loggedInUser.isLoggedIn ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
