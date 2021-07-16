import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
const ProtectedRoute = ({ children, ...rest }) => {
  const { loggedInUser } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() =>
        loggedInUser.isLoggedIn ? (
          children
        ) : (
          <div className="text-center text-primary">Please login</div>
        )
      }
    />
  );
};
export default ProtectedRoute;
