import "./LoginForm.css";
import warningImg from "../../../images/warning.png";

import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Auth } from "aws-amplify";
import { authSignIn } from "../../../actions";
import { returnErrors } from "../../../actions/errorActions";
import { renderError, getErrorClass } from "../../../helpers";

import { AuthContext } from "../../AppContext";

import GoogleAuth from "../../GoogleAuth/GoogleAuth";
import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";

class LoginForm extends React.Component {
  state = {
    showLoginError: false,
  };
  static contextType = AuthContext;

  componentDidMount() {
    // this.props.authSignIn("fake");
  }

  componentWillUnmount() {}

  onSubmit = async (formValues) => {
    const { email, password } = formValues;
    try {
      const user = await Auth.signIn(email, password);
      const userId = user.attributes.sub;
      await this.props.authSignIn({ userId, authMethod: "cognito" });
      this.context.userHasAuthenticated(true);
    } catch (e) {
      this.props.returnErrors(e.message, 400, "LOGIN_ERROR");
    }
  };

  handleEnterKeyOnField = (e) => {
    // This prevents submission bugging or refreshing upon pressing enter
    // in an input field inside a form
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.type !== "checkbox") {
        // this.props.handleSubmit(this.onSubmit)();
      }
    }
  };

  renderInput = ({ input, meta, inputProps, labelProps }) => {
    const errorClass = getErrorClass(meta);
    const labelClass = labelProps.class || null;
    const labelId = labelProps.id || null;
    return (
      <React.Fragment>
        <label
          htmlFor={inputProps.id}
          className={`${errorClass} ${labelClass}`}
          id={labelId}
        >
          {labelProps.text}
        </label>
        <input
          {...inputProps}
          {...input}
          className={`${inputProps.className} ${errorClass}`}
          onKeyDown={(e) => {
            this.handleEnterKeyOnField(e);
          }}
          autoFocus={inputProps.autoFocus || false}
        />
        {renderError(meta, "login")}
      </React.Fragment>
    );
  };

  renderErrorNotifications = () => {
    const errorMessage = this.props.error.msg;
    console.log(errorMessage);

    if (errorMessage) {
      return <ErrorNotifications message={errorMessage || null} />;
    }
    return null;
  };

  renderLoginError = () => {
    if (!this.state.showLoginError) {
      return null;
    }
    return (
      <div className={`login disconnected error`}>
        <img className="error-image" src={warningImg} alt="warning sign"></img>
        Unable to connect to server.
      </div>
    );
  };

  render() {
    return (
      <form id="login-form-form">
        <div id="login-form-field-div">
          {this.renderErrorNotifications()}
          <Field
            name="email"
            component={this.renderInput}
            type="text"
            props={{
              inputProps: {
                placeholder: "Email Address/Username",
                className: "text-field form-name-field",
                maxLength: "30",
                autoComplete: "off",
                id: "login-form-name-field",
                autoFocus: true,
              },
              labelProps: {
                class: "login form-label block",
                text: "Email Address / Username *",
                id: "login-form-name-label",
              },
            }}
          />
          <Field
            name="password"
            component={this.renderInput}
            type="password"
            props={{
              inputProps: {
                placeholder: "Password",
                className: "text-field form-name-field",
                type: "password",
                maxLength: "30",
                autoComplete: "off",
                id: "login-form-password-field",
              },
              labelProps: {
                class: "login form-label block",
                text: "Password *",
                id: "login-form-password-label",
              },
            }}
          />
          <div id="login-submit-div">
            <button
              type="submit"
              className="form-submit modal-action-button"
              id="login-form-submit"
              onClick={this.props.handleSubmit(this.onSubmit)}
              onKeyDown={(e) => {
                if (e.key === "Tab" && !e.shiftKey) {
                  // fill this up later
                  // e.preventDefault();
                  // e.stopPropagation();
                  //
                }
              }}
            >
              Log In
            </button>
            {this.renderLoginError()}
          </div>
          <div className="login-page-button-container">
            <GoogleAuth buttonClass="login-page" />
          </div>
          <div
            className="login-page-button-container link-text-container"
            id="register-link-container"
          >
            <Link
              id="register-text-link"
              className="small-text-link"
              to={`/register`}
            >
              Don't have an account? Register here.
            </Link>
          </div>
        </div>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.email) {
    errors.name = "Please input an email or username.";
  }
  if (!formValues.password) {
    errors.password = "Please input a password.";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  error: state.error,
});

const loginForm = connect(mapStateToProps, {
  authSignIn,
  returnErrors,
})(LoginForm);

export default reduxForm({
  form: "loginForm",
  validate,
})(loginForm);
