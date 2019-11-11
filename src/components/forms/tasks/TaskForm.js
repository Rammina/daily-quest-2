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
    const values = this.props.initialValues;
    if (values) {
      if (inputName === "date" || inputName === "time") {
        return values.deadline[inputName];
      }
      return values[inputName];
    }
    return "";
  };

  renderInput = ({ input, meta, componentProps }) => {
    const { disabled } = this.props;
    return (
      <React.Fragment>
        <input
          value={this.retrieveValue(input.name)}
          {...componentProps}
          {...input}
          disabled={disabled || false}
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
    const { disabled } = this.props;
    return (
      <React.Fragment>
        <textarea
          value={this.retrieveValue(input.name)}
          {...componentProps}
          {...input}
          disabled={disabled || false}
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
    const { disabled } = this.props;
    return (
      <form id="task-form-form">
        <div className="task-form-field-div">
          <label htmlFor="task-name-field">Task Name</label>
          <Field
            name="name"
            component={this.renderInput}
            type="text"
            props={{
              componentProps: {
                placeholder: "Task Name",
                className: "text-field form-name-field",
                id: "task-name-field",
                maxLength: "30",
                autoComplete: "off"
              }
            }}
          />
        </div>
        <div className="task-form-field-div">
          <label htmlFor="task-description-field">Task Description</label>
          <Field
            name="description"
            component={this.renderTextArea}
            props={{
              componentProps: {
                placeholder: "Task Description",
                className: "text-field form-description-field",
                id: "task-description-field",
                maxLength: "100",
                rows: "4",
                autoComplete: "off"
              }
            }}
          />
        </div>
        <div className="task-form-field-div">
          <label htmlFor="task-date-field">Date</label>
          <Field
            name="date"
            component={this.renderInput}
            props={{
              componentProps: {
                placeholder: "Date",
                className: "text-field form-date-field",
                id: "task-date-field",
                autoComplete: "off",
                type: "date"
                // min: today
                // <input id="add-task-date-field" class="add-task-modal-required datetime-field text-field" type="text" placeholder="Date (optional)" name="task-date" onfocus="(this.type='date')" required="true" min="${today}">
              }
            }}
          />
          <label htmlFor="task-time-field">Time</label>
          <Field
            name="time"
            component={this.renderInput}
            props={{
              componentProps: {
                placeholder: "Time",
                className: "text-field form-time-field",
                id: "task-time-field",
                type: "time",
                autoComplete: "off"
                // disabled: disabled || false
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
