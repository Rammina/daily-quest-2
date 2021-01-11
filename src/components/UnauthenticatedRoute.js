import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AppContext";

export default function UnauthenticatedRoute({ children, ...rest }) {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Route {...rest}>{!isAuthenticated ? children : <Redirect to="/" />}</Route>
  );
}
