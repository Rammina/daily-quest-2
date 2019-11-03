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

  renderInput = ({ input, meta }) => {
    console.log(this.props.initialValues);
    return (
      <React.Fragment>
        <input
          className="project-form-modal required text-field project-form-title-field"
          type="text"
          name="project-title"
          placeholder="Project Name"
          maxLength="30"
          autoComplete="off"
          defaultValue={this.props.initialValues.name || ""}
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
      <form
        onSubmit={this.props.onSubmit(this.onSubmit)}
        id="project-form-form"
      >
        <div id="project-form-field-div">
          <Field
            name="title"
            component={this.renderInput}
            onChange={() => {}}
          />
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
          />
        </div>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Please input a title for the project.";
  }
  return errors;
};

export default reduxForm({
  form: "projectForm",
  validate
})(ProjectForm);
