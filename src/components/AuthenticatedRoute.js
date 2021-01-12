import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect } from "react-redux";
// import { AuthContext } from "./AppContext";

function AuthenticatedRoute(props) {
  const { children, ...rest } = props;
  console.log(children);
  console.log(props);
  console.log({ ...rest });
  const { pathname, search } = useLocation();
  // const { isSignedIn } = useContext(AuthContext);
  console.log(props.isSignedIn);
  console.log(props.computedMatch.params);
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
