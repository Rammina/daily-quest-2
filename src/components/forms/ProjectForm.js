import React from "react";
import { Field, reduxForm } from "redux-form";

import ModalCancelButton from "../Modal/common/ModalCancelButton";

class ProjectForm extends React.Component {
  renderError = ({ error, touched } /*deconstructed meta object*/) => {
    if (error && touched) {
      return <div>{error}</div>;
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
          name="project-title"
          placeholder="Project Name"
          maxLength="30"
          autoComplete="off"
          value={this.renderNameValue()}
          {...input}
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
          <ModalCancelButton onClose={this.props.onClose} />

          <input
            type="submit"
            className="form-submit"
            id="project-form-submit"
            value="Submit"
            onClick={this.props.handleSubmit}
          />
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
