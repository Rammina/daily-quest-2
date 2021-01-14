import "./RegisterForm.css";
import warningImg from "../../../images/warning.png";

import React from "react";
import ReactDOM from "react-dom";
import { Field, reduxForm } from "redux-form";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { renderError, getErrorClass } from "../../../helpers";

// import { AuthContext } from "../../AppContext";
// import GoogleAuth from "../../GoogleAuth/GoogleAuth";

class RegisterForm extends React.Component {
  state = {
    showRegisterError: false,
    // newUser: null,
    isLoading: false,
  };
  // static contextType = AuthContext;

  componentDidMount() {}

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

  onSubmit = async (formValues) => {
    const { email, password } = formValues;
    // setIsLoading(true);
    console.log("registering user after submit");
    console.log(email);
    try {
      const newUser = await Auth.signUp({
        username: email,

        password: password,
        attributes: {
          email: email,
        },
      });
      const userId = newUser.userSub;
      // setIsLoading(false);
      console.log(newUser);
      this.props.setNewUser({ email, password, userId });
    } catch (e) {
      // note: this should have a custom error message show up on top of the form
      // onError(e);
      console.log(e.message);

      // setIsLoading(false);
    }
    // this.props.onSubmit(formValues);
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="register-page-header">Register for an Account</h2>
        <form id="register-form-form">
          <div id="register-form-field-div">
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
                  id: "register-form-name-field",
                  autoFocus: true,
                },
                labelProps: {
                  class: "register form-label block",
                  text: "Email Address / Username *",
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
                    // fill this up later
                    // e.preventDefault();
                    // e.stopPropagation();
                    //
                  }
                }}
              >
                Register
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
    errors.email = "Please input an email or username.";
  }
  if (!formValues.password) {
    errors.password = "Please input a password.";
  }
  if (!formValues.password2) {
    errors.password2 = "Please input a matching password.";
  } else if (formValues.password !== formValues.password2) {
    errors.password2 = "Passwords do not match.";
  }

  return errors;
};

export default reduxForm({
  form: "registerForm",
  validate,
})(RegisterForm);
