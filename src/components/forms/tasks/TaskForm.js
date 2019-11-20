// import "./TaskForm.css";

import React from "react";
import { Field, reduxForm } from "redux-form";
import { getCurrentDate, autoGrow } from "../../../helpers";
import warningImg from "../../../images/warning.png";

import ModalCancelButton from "../../Modal/common/ModalCancelButton";

class TaskForm extends React.Component {
  state = {
    finished: this.props.initialValues
      ? this.props.initialValues.finished
      : false
  };

  renderError = ({ error, touched } /*deconstructed meta object*/) => {
    if (error && touched) {
      return (
        <div className="task error">
          <img
            className="error-image"
            src={warningImg}
            alt="warning sign"
          ></img>
          {error}
        </div>
      );
    }
    return null;
  };

  renderClassError = ({ error, touched }) => {
    if (error && touched) {
      return "error";
    }
    return null;
  };

  retrieveChecked = inputName => {
    if (inputName === "finished") {
      return this.state.finished;
    }
    return undefined;
  };

  renderInput = ({ input, meta, componentProps }) => {
    const { disabled } = this.props;
    return (
      <React.Fragment>
        <input
          disabled={disabled || false}
          {...componentProps}
          {...input}
          onKeyDown={e => {
            if (e.keyCode === 13) {
              e.preventDefault();
              e.stopPropagation();
              if (input.name !== "finished") {
                this.props.handleSubmit(this.onSubmit)();
              }
            }
          }}
          checked={this.retrieveChecked(input.name)}
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
          // onLoad={e => autoGrow(e.target)}
          onInput={e => autoGrow(e.target)}
        ></textarea>
        {this.renderError(meta)}
      </React.Fragment>
    );
  };

  renderSelect = ({ input, meta, componentProps }) => {
    const { disabled } = this.props;
    return (
      <React.Fragment>
        <select {...componentProps} {...input} disabled={disabled || false}>
          <option value="">--Priority Level--</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        {this.renderError(meta)}
      </React.Fragment>
    );
  };

  renderNameField = () => {
    if (this.props.disabled) {
      return this.renderTextArea;
    }
    return this.renderInput;
  };

  // Hides buttons for detail display ( used only by non-action modals )
  hideButtons = () => {
    if (this.props.hideButtons) {
      return { display: "none" };
    }
    return {};
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    console.log(this.props.initialValues);
    const { disabled } = this.props;
    return (
      <form id="task-form-form">
        <div className="task-form-field-div">
          <label htmlFor="task-name-field" className="form-label block">
            Task Name *
          </label>
          <Field
            name="name"
            component={this.renderNameField()}
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
          <label htmlFor="task-description-field" className="form-label block">
            Task Description
          </label>
          <Field
            name="description"
            component={this.renderTextArea}
            props={{
              componentProps: {
                placeholder: "Task Description",
                className: "text-field form-description-field",
                id: "task-description-field",
                maxLength: "100",
                rows: "1",

                autoComplete: "off"
              }
            }}
          />
        </div>
        <div className="task-form-field-div">
          <label htmlFor="task-date-field" className="form-label block">
            Date
          </label>
          <Field
            name="date"
            component={this.renderInput}
            props={{
              componentProps: {
                placeholder: "Date",
                className: "text-field form-date-field",
                id: "task-date-field",
                type: "date",
                min: getCurrentDate()
              }
            }}
          />
          <label htmlFor="task-time-field" className="form-label block">
            Time
          </label>
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
        <div className="task-form-field-div">
          <label htmlFor="task-name-field" className="form-label block">
            Task Priority
          </label>
          <Field
            name="priority"
            component={this.renderSelect}
            props={{
              componentProps: {
                placeholder: "Task Priority",
                className: "text-field form-priority-field",
                id: "task-priority-field"
              }
            }}
          />
        </div>
        <div className="task-form-field-div" id="task-form-checkbox-div">
          <label
            htmlFor="task-date-field"
            className="form-label checkbox-label"
            id="task-form-checkbox-label"
          >
            Finished
          </label>
          <Field
            name="finished"
            component={this.renderInput}
            type="checkbox"
            props={{
              componentProps: {
                className: "text-field form-checkbox",
                id: "task-form-checkbox",
                type: "checkbox",
                disabled: false,
                onClick: e => {
                  const target = e.target;
                  this.setState({ finished: !this.state.finished });
                  target.blur();
                  setTimeout(() => {
                    target.focus();
                  }, 0);
                }
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
            hideButtons={this.hideButtons()}
          />

          <button
            type="submit"
            className="form-submit modal-action-button"
            id="task-form-submit"
            onClick={this.props.handleSubmit(this.onSubmit)}
            style={this.hideButtons()}
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
    errors.name = "Please input a name.";
  }

  return errors;
};

export default reduxForm({
  form: "taskForm",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate
})(TaskForm);

// Format for date database retrieval
// YYYY-MM-DD
// format for date input From form field
// MM/DD/YYYY

// The output needs to be changed to database format before posting it to firebase

// Format for time database retrieval
// HH:mm (military time)

// format for time input from form field
// HH:mmA
