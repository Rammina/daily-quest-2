import "./ErrorPage.css";

import React from "react";
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
          <div className="two-buttons-container">
            <button className="error-page-button transparent-bg-button">
              Home
            </button>
            <button className="error-page-button transparent-bg-button">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ErrorPage;
