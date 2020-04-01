import "./ErrorPage.css";

import React from "react";
class ErrorPage extends React.Component {
  state = {};
  componentDidMount() {}
  renderErrorMessage = () => {
    if (this.props.errorType === "404") {
      return (
        <React.Fragment>
          <h1>Error 404</h1>
          <p>Sorry, the page you are looking for could not be found.</p>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <h1>Error</h1>
        <p>Sorry, something went wrong.</p>
      </React.Fragment>
    );
  };
  render() {
    return (
      <div className="error-page-container">
        <div className="error-page-message-container">
          {this.renderErrorMessage()}
        </div>
      </div>
    );
  }
}
export default ErrorPage;
