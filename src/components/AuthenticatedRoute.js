import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";

function AuthenticatedRoute(props) {
  const { children, ...rest } = props;
  const { pathname, search } = useLocation();
  return (
    <Route {...rest}>
      {props.isSignedIn ? (
        children
      ) : (
        <Redirect to={`/login-page?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {})(AuthenticatedRoute);
