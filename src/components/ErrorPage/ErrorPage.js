import "./ErrorPage.css";

import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";

class ErrorPage extends React.Component {
  state = {};
  componentDidMount() {}
  renderErrorMessage = () => {
    let errorHeader = "Error";
    let errorParagraph = "Sorry, something went wrong.";
    let errorType = this.props.errorType || null;
    let errorCodeMessage = errorType ? (
      <p className="error-page-code">Error code: {errorType}</p>
    ) : null;

    if (this.props.errorType === "404") {
      errorHeader = "Page not found";
      errorParagraph =
        "Sorry, we can't seem to find the page you're looking for.";
    }
    return (
      <React.Fragment>
        <h1 className="error-page-header">{errorHeader}</h1>
        <p className="error-page-paragraph">{errorParagraph}</p>
        {errorCodeMessage}
      </React.Fragment>
    );
  };
  render() {
    return (
      <div className="error-page-container">
        <div className="error-page-message-container">
          {this.renderErrorMessage()}
          <p className="error-page-paragraph">
            Try going back to the previous page or click these links that can
            help you:
          </p>
          <div className="error-page two-buttons-container">
            <Link
              to="/home"
              className=""
              onClick={() => {
                // force redirect if user is not logged in yet
                if (!this.props.isSignedIn) {
                  setTimeout(() => {
                    history.push("/login-page");
                  }, 1);
                }
              }}
            >
              <button className="error-page transparent-bg-button">Home</button>
            </Link>
            <Link to="/login-page" className="">
              <button className="error-page transparent-bg-button">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.googleAuth.isSignedIn };
};

export default connect(
  mapStateToProps,
  {}
)(ErrorPage);
