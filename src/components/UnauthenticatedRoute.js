import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { AuthContext } from "./AppContext";

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function UnauthenticatedRoute(props) {
  const { children, ...rest } = props;
  // const { isSignedIn } = useContext(AuthContext);
  const redirect = querystring("redirect");
  return (
    <Route {...rest}>
      {!props.isSignedIn ? (
        children
      ) : (
        <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
      )}
    </Route>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {})(UnauthenticatedRoute);
