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

  renderNameValue = () => {
    if (this.props.initialValues) {
      return this.props.initialValues.name;
    }
    return "";
  };

  renderInput = ({ input, meta }) => {
    return (
      <React.Fragment>
        <input
          className="project-form-modal required text-field project-form-title-field"
          type="text"
          name="name"
          placeholder="Project Name"
          maxLength="30"
          autoComplete="off"
          value={this.renderNameValue()}
          {...input}
          onKeyDown={e => {
            console.log(e.keyCode);
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
          <Field name="name" component={this.renderInput} />
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
