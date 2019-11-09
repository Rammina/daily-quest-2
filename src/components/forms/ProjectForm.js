import "./ProjectForm.css";

import React from "react";
import { Field, reduxForm } from "redux-form";

import ModalCancelButton from "../Modal/common/ModalCancelButton";

class ProjectForm extends React.Component {
  renderError = ({ error, touched } /*deconstructed meta object*/) => {
    if (error && touched) {
      return <div className="project error">{error}</div>;
    }
    return null;
  };

  retrieveValue = inputName => {
    if (this.props.initialValues) {
      return this.props.initialValues[inputName];
    }
    return "";
  };

  renderInput = ({ input, meta, inputProps }) => {
    return (
      <React.Fragment>
        <input
          value={this.retrieveValue(input.name)}
          {...inputProps}
          {...input}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              e.preventDefault();
              e.stopPropagation();
              this.props.handleSubmit(this.onSubmit)();
            }
          }}
        />
        {this.renderError(meta)}
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
                autoComplete: "off"
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
