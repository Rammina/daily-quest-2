import "./Register.css";
import StarImg from "../../images/star.png";

import React from "react";

import RegisterForm from "../forms/register/RegisterForm";
import ConfirmationForm from "../forms/register/ConfirmationForm";
import history from "../../history";

class Register extends React.Component {
  state = {
    newUser: null,
    showLoader: true,
    showConfirm: false,
  };

  componentDidMount() {
    // redirect to homepage
    if (this.props.isSignedIn) {
      history.push("/home");
    }
    this.setState({ showLoader: false });
  }

  setNewUser = (newUser) => {
    this.setState({ newUser });
  };

  setShowConfirm = (bool) => {
    this.setState({ showConfirm: bool });
  };

  render() {
    return (
      <div
        data-test="component-register-page"
        className="register-page-container"
      >
        <div id="register-page-title-div">
          <img
            id="register-page-title-image"
            src={StarImg}
            alt="Blue Star Icon"
          ></img>
          <h1 id="register-page-title">Daily Quest</h1>
        </div>
        <div
          className="form-container"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {this.state.showConfirm === false ? (
            <RegisterForm
              setNewUser={this.setNewUser}
              setShowConfirm={this.setShowConfirm}
            />
          ) : (
            <ConfirmationForm
              newUser={this.state.newUser}
              setShowConfirm={this.setShowConfirm}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default Register;

/*
renderRegisterError = () => {
  if (!this.state.showRegisterError) {
    return null;
  }
  return (
    <div className={`register disconnected error`}>
      <img className="error-image" src={warningImg} alt="warning sign"></img>
      Unable to connect to server.
    </div>
  );
};
*/
