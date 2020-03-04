import "./LoginPage.css";
import StarImg from "../../images/star.png";

import React from "react";

import GoogleAuth from "../GoogleAuth/GoogleAuth";

class LoginPage extends React.Component {
  state = {
    showLoader: true
  };

  componentDidMount() {
    this.setState({ showLoader: false });
  }

  render() {
    return (
      <div data-test="component-login-page" className="login-page-container">
        <div className="login-page-form-container">
          <div className="login-page-button-container">
            <div id="login-page-title-div">
              <img
                id="login-page-title-image"
                src={StarImg}
                alt="Blue Star Icon"
              ></img>
              <h1 id="login-page-title">Daily Quest</h1>
            </div>

            <h2 className="login-page-header">Log In</h2>
            <GoogleAuth />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
