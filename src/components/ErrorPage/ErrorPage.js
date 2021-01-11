import GirlImg from "../../images/blue-girl.png";

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
      <p className="error-page-code move-up-until-450w">
        Error code: {errorType}
      </p>
    ) : null;

    if (this.props.errorType === "404") {
      errorHeader = "Page not found";
      errorParagraph =
        "Sorry, we can't seem to find the page you're looking for.";
    }
    return (
      <React.Fragment>
        <div className="error-page-title-container">
          <h1 className="error-page-header">{errorHeader} </h1>
          <span className="error-page-image-container">
            <img
              className="error-page-image"
              src={GirlImg}
              alt="blue haired girl error"
            />
          </span>
        </div>

        <p className="error-page-paragraph move-up-until-450w">
          {errorParagraph}
        </p>
        {errorCodeMessage}
      </React.Fragment>
    );
  };
  render() {
    return (
      <div className="error-page-container">
        <div className="error-page-message-container">
          {this.renderErrorMessage()}
          <p className="error-page-paragraph move-up-until-450w">
            Try going back to the previous page or click one of the links below:
          </p>
          <div className="error-page two-buttons-container move-up-until-450w">
            <Link
              to="/home"
              className="error-page transparent-bg-button"
              onClick={() => {
                // force redirect if user is not logged in yet
                if (!this.props.isSignedIn) {
                  setTimeout(() => {
                    history.push("/login-page");
                  }, 1);
                }
              }}
            >
              Home
            </Link>
            <Link to="/login-page" className="error-page transparent-bg-button">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {})(ErrorPage);
