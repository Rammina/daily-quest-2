import "./LoginPage.css";
import StarImg from "../../images/star.png";

import React from "react";

import LoginForm from "../forms/login/LoginForm";

class LoginPage extends React.Component {
  state = {
    showLoader: true,
  };

  componentDidMount() {
    this.setState({ showLoader: false });
  }

  render() {
    return (
      <div data-test="component-login-page" className="login-page-container">
        <div id="login-page-title-div">
          <img
            id="login-page-title-image"
            src={StarImg}
            alt="Blue Star Icon"
          ></img>
          <h1 id="login-page-title">Daily Quest</h1>
        </div>
        <div
          className="form-container"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <h2 className="login-page-header">Log In to Daily Quest</h2>
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
