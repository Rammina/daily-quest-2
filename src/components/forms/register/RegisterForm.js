import "./RegisterForm.css";

import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { returnErrors, clearErrors } from "../../../actions/errorActions";
import { formShowLoader } from "../../../actions/loaderActions";
import { renderError, getErrorClass, validateEmail } from "../../../helpers";
import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

import { AuthContext } from "../../AppContext";

class RegisterForm extends React.Component {
  state = {
    showRegisterError: false,
    isLoading: false,
  };
  static contextType = AuthContext;

  componentDidMount() {}
  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleEnterKeyOnField = (e) => {
    // This prevents submission bugging or refreshing upon pressing enter
    // in an input field inside a form
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.type !== "checkbox") {
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
          autoComplete="off"
          className={`${inputProps.className} ${errorClass}`}
          onKeyDown={(e) => {
            this.handleEnterKeyOnField(e);
          }}
          autoFocus={inputProps.autoFocus || false}
        />
        {renderError(meta, "register")}
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

  renderLoader = () => {
    return <LoadingSpinner showLoader={this.props.showLoader} />;
  };

  createErrorMsg = (message) => {
    let errorMsg = null;
    // error message that states password should have greater or equal to 6 characters
    if (
      message.includes("password") &&
      message.includes("length greater than or equal to 6")
    ) {
      errorMsg = "Password must have 6 characters or more.";
    } else if (
      message.includes("Password") &&
      message.includes("uppercase characters")
    ) {
      errorMsg = "Password must have an uppercase character.";
    } else if (
      message.includes("Password") &&
      message.includes("numeric characters")
    ) {
      errorMsg = "Password must have a numeric character.";
    } else if (
      message.includes("Password") &&
      message.includes("symbol characters")
    ) {
      errorMsg = "Password must have a symbol character.";
    }
    return errorMsg;
  };

  onSubmit = async (formValues) => {
    const { email, password } = formValues;
    this.props.formShowLoader("registerForm", true);

    try {
      const newUser = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
        },
      });
      const userId = newUser.userSub;
      console.log(newUser);
      await this.props.setNewUser({ email, password, userId });
      this.props.setShowConfirm(true);
      this.props.clearErrors();
    } catch (e) {
      console.log(e);
      console.log(e.message);
      console.log(this.createErrorMsg(e.message));
      this.props.returnErrors(
        this.createErrorMsg(e.message) || e.message,
        400,
        "REGISTER_ERROR"
      );
    } finally {
      this.props.formShowLoader("registerForm", false);
    }
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="register-page-header">Register for an Account</h2>
        <form id="register-form-form">
          <div id="register-form-field-div">
            {this.renderErrorNotifications()}
            <Field
              name="email"
              component={this.renderInput}
              type="text"
              props={{
                inputProps: {
                  placeholder: "Email Address",
                  className: "text-field form-name-field",
                  maxLength: "30",
                  autoComplete: "off",
                  id: "register-form-name-field",
                  autoFocus: true,
                },
                labelProps: {
                  class: "register form-label block",
                  text: "Email Address *",
                  id: "register-form-name-label",
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
                  maxLength: "30",
                  autoComplete: "off",
                  id: "register-form-password-field",
                  type: "password",
                },
                labelProps: {
                  class: "register form-label block",
                  text: "Password *",
                  id: "register-form-password-label",
                },
              }}
            />
            <Field
              name="password2"
              component={this.renderInput}
              type="password"
              props={{
                inputProps: {
                  placeholder: "Confirm Password",
                  className: "text-field form-name-field",
                  maxLength: "30",
                  autoComplete: "off",
                  id: "register-form-confirm-password-field",
                  type: "password",
                },
                labelProps: {
                  class: "register form-label block",
                  text: "Confirm Password *",
                  id: "register-form-confirm-password-label",
                },
              }}
            />
            <div id="register-submit-div">
              <button
                type="submit"
                className="form-submit modal-action-button"
                id="register-form-submit"
                onClick={this.props.handleSubmit(this.onSubmit)}
                onKeyDown={(e) => {
                  if (e.key === "Tab" && !e.shiftKey) {
                  }
                }}
              >
                {this.renderLoader()} Register
              </button>
            </div>
            <div
              className="register-page-button-container link-text-container"
              id="login-link-container"
            >
              <Link
                id="login-text-link"
                className="small-text-link"
                to={`/login-page`}
              >
                Click here to login instead.
              </Link>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "Please input an email.";
  } else if (!validateEmail(formValues.email)) {
    errors.email = "Invalid email address.";
  }
  if (!formValues.password) {
    errors.password = "Please input a password.";
  }
  // After null checking, check length
  else if (formValues.password.length < 6) {
    errors.password = "The password must be at least 6 characters.";
  }
  // Check for capital letters
  else if (formValues.password.search(/[A-Z]/) < 0) {
    errors.password = "The password must contain an uppercase letter.";
  }
  // Check for numbers
  else if (formValues.password.search(/[0-9]/) < 0) {
    errors.password = "The password must contain a number.";
  }
  // Check for special characters
  else if (
    !/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(formValues.password)
  ) {
    errors.password = "The password must contain a special character.";
  }

  if (!formValues.password2) {
    errors.password2 = "Please input a matching password.";
  } else if (formValues.password !== formValues.password2) {
    errors.password2 = "Passwords do not match.";
  }

  return errors;
};

const mapStateToProps = (state) => ({
  error: state.error,
  showLoader: state.loader.showRegisterFormLoader,
});

const registerForm = connect(mapStateToProps, {
  returnErrors,
  clearErrors,
  formShowLoader,
})(RegisterForm);

export default reduxForm({
  form: "registerForm",
  validate,
})(registerForm);
