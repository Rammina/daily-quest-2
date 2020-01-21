import "./ProjectForm.css";
import warningImg from "../../../images/warning.png";

import React from "react";
import ReactDOM from "react-dom";
import { Field, reduxForm } from "redux-form";
import { renderError, getErrorClass } from "../../../helpers";

import ModalCancelButton from "../../Modal/common/ModalCancelButton";
import { ModalCloseButtonContext } from "../../AppContext";

class ProjectForm extends React.Component {
  state = {
    autofocus: false
  };
  static contextType = ModalCloseButtonContext;

  componentDidMount() {}

  handleEnterKeyOnField = e => {
    // This prevents submission bugging or refreshing upon pressing enter
    // in an input field inside a form
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.type !== "checkbox") {
        this.props.handleSubmit(this.onSubmit)();
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
        {renderError(meta, "project")}
      </React.Fragment>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form id="project-form-form">
        <div id="project-form-field-div">
          <Field
            name="name"
            component={this.renderInput}
            type="text"
            props={{
              inputProps: {
                placeholder: "Project Name",
                className: "text-field form-name-field",
                maxLength: "30",
                autoComplete: "off",
                id: "project-form-name-field",
                autoFocus: true
              },
              labelProps: {
                class: "form-label block",
                text: "Project Name *",
                id: "project-form-name-label"
              }
            }}
          />
        </div>

        <div
          className="two-buttons-container"
          id="project-form-buttons-container"
        >
          <ModalCancelButton
            onClose={() => {
              console.log("cancel dismissed");
              this.props.onClose();
            }}
          />

          <button
            type="submit"
            className="form-submit modal-action-button"
            id="project-form-submit"
            onClick={this.props.handleSubmit(this.onSubmit)}
            onKeyDown={e => {
              if (e.key === "Tab") {
                e.preventDefault();
                e.stopPropagation();
                // put the element to focus here
                if (this.context.modalCloseButtonRef) {
                  this.context.modalCloseButtonRef.focus();
                }
              }
            }}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Please input a name for the project.";
  }
  return errors;
};

export default reduxForm({
  form: "projectForm",
  validate
})(ProjectForm);
