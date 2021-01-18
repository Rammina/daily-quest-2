import React from "react";

import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Auth } from "aws-amplify";
import { returnErrors, clearErrors } from "../../../actions/errorActions";
import { formShowLoader } from "../../../actions/loaderActions";
import { renderError, getErrorClass } from "../../../helpers";
import { authSignIn } from "../../../actions";
import ErrorNotifications from "../../ErrorNotifications/ErrorNotifications";

import { AuthContext } from "../../AppContext";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

class ConfirmationForm extends React.Component {
  state = {
    isLoading: false,
  };
  static contextType = AuthContext;

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

  onSubmit = async (formValues) => {
    this.props.formShowLoader("confirmationForm", true);

    try {
      const { email, password, userId } = this.props.newUser;
      console.log(this.props.newUser);
      console.log(email);
      await Auth.confirmSignUp(email, formValues.confirmation_code);
      await Auth.signIn(email, password);
      this.context.showLoaderBeforeCheck();
      // get the user ID for cognito user
      console.log(userId);
      await this.props.authSignIn({ userId, authMethod: "cognito" });
      this.context.userHasAuthenticated(true);
      this.props.clearErrors();
    } catch (e) {
      console.log(e);
      console.log(e.message);
      this.props.returnErrors(e.message, 400, "CONFIRMATION_ERROR");
    } finally {
      this.context.fadeLoaderAfterCheck();
      this.props.formShowLoader("confirmationForm", false);
    }
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="register-page-header">Enter Email Confirmation Code</h2>
        <form id="register-form-form">
          <div id="register-form-field-div">
            {this.renderErrorNotifications()}
            <Field
              name="confirmation_code"
              component={this.renderInput}
              type="tel"
              props={{
                inputProps: {
                  placeholder: "Confirmation Code",
                  className: "text-field form-name-field",
                  maxLength: "30",
                  autoComplete: "off",
                  id: "register-form-confirmation-code-field",
                  autoFocus: true,
                },
                labelProps: {
                  class: "register form-label block",
                  text: "Email Confirmation Code *",
                  id: "register-form-confirmation-code-label",
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
                {this.renderLoader()} Verify
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.confirmation_code) {
    errors.confirmation_code = "Please input the confirmation code.";
  }
  return errors;
};

const mapStateToProps = (state) => ({
  error: state.error,
  showLoader: state.loader.showConfirmationFormLoader,
});

const confirmationForm = connect(mapStateToProps, {
  authSignIn,
  returnErrors,
  clearErrors,
  formShowLoader,
})(ConfirmationForm);

export default reduxForm({
  form: "confirmationForm",
  validate,
})(confirmationForm);
