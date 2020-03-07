import "./LoginForm.css";
import warningImg from "../../../images/warning.png";

import React from "react";
import ReactDOM from "react-dom";
import { Field, reduxForm } from "redux-form";
import { renderError, getErrorClass } from "../../../helpers";

import GoogleAuth from "../../GoogleAuth/GoogleAuth";

class LoginForm extends React.Component {
  state = {
    showLoginError: false
  };

  componentDidMount() {}

  handleEnterKeyOnField = e => {
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
          onKeyDown={e => {
            this.handleEnterKeyOnField(e);
          }}
          autoFocus={inputProps.autoFocus || false}
        />
        {renderError(meta, "login")}
      </React.Fragment>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
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
          <Field
            name="name"
            component={this.renderInput}
            type="text"
            props={{
              inputProps: {
                placeholder: "Email Address/Username",
                className: "text-field form-name-field",
                maxLength: "30",
                autoComplete: "off",
                id: "login-form-name-field"
                // autoFocus: true
              },
              labelProps: {
                class: "form-label block",
                text: "Email Address / Username *",
                id: "login-form-name-label"
              }
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
                maxLength: "30",
                autoComplete: "off",
                id: "login-form-password-field"
              },
              labelProps: {
                class: "form-label block",
                text: "Password *",
                id: "login-form-password-label"
              }
            }}
          />
          <div>
            <button
              type="submit"
              className="form-submit modal-action-button"
              id="login-form-submit"
              onClick={() => {
                // show error for now because I have not set up the backend yet
                this.setState({ showLoginError: true });
                // this.props.handleSubmit(this.onSubmit);
              }}
              onKeyDown={e => {
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
        </div>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Please input an email or username.";
  }
  if (!formValues.password) {
    errors.password = "Please input a password.";
  }
  return errors;
};

export default reduxForm({
  form: "loginForm",
  validate
})(LoginForm);
