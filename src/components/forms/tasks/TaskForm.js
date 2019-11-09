// import "./TaskForm.css";

import React from "react";
import { Field, reduxForm } from "redux-form";

import ModalCancelButton from "../../Modal/common/ModalCancelButton";

class TaskForm extends React.Component {
  renderError = ({ error, touched } /*deconstructed meta object*/) => {
    if (error && touched) {
      return <div className="task error">{error}</div>;
    }
    return null;
  };
  retrieveValue = inputName => {
    if (this.props.initialValues) {
      return this.props.initialValues[inputName];
    }
    return "";
  };

  renderInput = ({ input, meta, componentProps }) => {
    return (
      <React.Fragment>
        <input
          value={this.retrieveValue(input.name)}
          {...componentProps}
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

  renderTextArea = ({ input, meta, componentProps }) => {
    return (
      <React.Fragment>
        <textarea
          value={this.retrieveValue(input.name)}
          {...componentProps}
          {...input}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              e.preventDefault();
              e.stopPropagation();
              this.props.handleSubmit(this.onSubmit)();
            }
          }}
        ></textarea>
        {this.renderError(meta)}
      </React.Fragment>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form id="task-form-form">
        // task name
        <div class="task-form-field-div">
          <Field
            name="name"
            component={this.renderInput}
            type="text"
            props={{
              componentProps: {
                placeholder: "Task Name",
                className: "text-field form-name-field",
                maxLength: "30",
                autoComplete: "off"
              }
            }}
          />
        </div>
        // task description
        <div class="task-form-field-div">
          <Field
            name="description"
            component={this.renderTextArea}
            props={{
              componentProps: {
                placeholder: "Task Description",
                className: "text-field form-description-field",
                maxLength: "100",
                rows: "4",
                autoComplete: "off"
              }
            }}
          />
        </div>
        // task deadline
        <div class="task-form-field-div">
          <Field
            name="name"
            component={this.renderInput}
            type="text"
            props={{
              componentProps: {
                placeholder: "Task Name",
                className: "text-field form-name-field",
                maxLength: "30",
                autoComplete: "off"
              }
            }}
          />
        </div>
        <div className="two-buttons-container" id="task-form-buttons-container">
          <ModalCancelButton
            onClose={() => {
              console.log("cancel dismissed");
              this.props.onClose();
            }}
          />

          <button
            type="submit"
            className="form-submit modal-action-button"
            id="task-form-submit"
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
    errors.name = "Please input a name for the task.";
  }
  return errors;
};

export default reduxForm({
  form: "taskForm",
  validate
})(TaskForm);
