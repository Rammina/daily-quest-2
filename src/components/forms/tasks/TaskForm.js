// import "./TaskForm.css";

import warningImg from "../../../images/warning.png";
import submitImg from "../../../images/submit.png";

import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  getCurrentDate,
  autoGrow,
  autoGrowValue,
  renderError,
  getErrorClass
} from "../../../helpers";

import ModalCancelButton from "../../Modal/common/ModalCancelButton";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.textAreaElement = React.createRef();
    this.state = {
      finished: this.props.initialValues
        ? this.props.initialValues.finished
        : false
    };
  }
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

  retrieveChecked = inputName => {
    return inputName === "finished" ? this.state.finished : undefined;
  };

  renderInput = ({ input, meta, inputProps, labelProps }) => {
    const { disabled } = this.props;
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
          disabled={disabled || false}
          {...inputProps}
          {...input}
          className={`${inputProps.className} ${errorClass}`}
          onKeyDown={e => {
            this.handleEnterKeyOnField(e, input);
          }}
          checked={this.retrieveChecked(input.name)}
          autoFocus={inputProps.autoFocus || false}
        />
        {renderError(meta, "task")}
      </React.Fragment>
    );
  };

  renderTextArea = ({ input, meta, inputProps, labelProps }) => {
    const { disabled } = this.props;
    const errorClass = getErrorClass(meta);

    // get rid of description placeholders
    if (input.name === "description" && !disabled) {
      input.value =
        input.value !== "No description provided." ? input.value : "";
    }

    if (!disabled) {
      return (
        <React.Fragment>
          <label
            htmlFor={inputProps.id}
            className={`form-label block ${errorClass}`}
          >
            {labelProps.text}
          </label>
          <textarea
            {...inputProps}
            {...input}
            rows={7}
            className={`${inputProps.className} ${errorClass}`}
            disabled={disabled || false}
            onKeyDown={e => {
              this.handleEnterKeyOnField(e, input);
            }}
            onInput={e => autoGrow(e.target)}
            // onFocus={e => autoGrow(e.target)}
          ></textarea>

          {renderError(meta, "task")}
        </React.Fragment>
      );
    } else if (disabled) {
      return (
        <React.Fragment>
          <label
            htmlFor={inputProps.id}
            className={`form-label block ${errorClass}`}
          >
            {labelProps.text}
          </label>
          <div className={`text-field disabled`}>{input.value}</div>

          {renderError(meta, "task")}
        </React.Fragment>
      );
    }
  };

  renderSelect = ({ input, meta, inputProps, labelProps }) => {
    const { disabled } = this.props;
    const errorClass = getErrorClass(meta);
    return (
      <React.Fragment>
        <label
          htmlFor={inputProps.id}
          className={`form-label block ${errorClass}`}
        >
          {labelProps.text}
        </label>
        <select
          {...inputProps}
          {...input}
          className={`${inputProps.className} ${errorClass}`}
          disabled={disabled || false}
        >
          <option value="">--Priority Level--</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        {renderError(meta, "task")}
      </React.Fragment>
    );
  };

  renderNameField = () => {
    if (this.props.disabled) {
      return this.renderTextArea;
    }
    return this.renderInput;
  };

  // Hides buttons for details display ( used only by non-action modals )
  hideButtons = () => {
    if (this.props.hideButtons) {
      return { display: "none" };
    }
    return {};
  };

  // This is the opposite of hidebuttons, show only when form is disabled
  showIfDisabled = () => {
    if (!this.props.hideButtons) {
      return { display: "none" };
    }
    return {};
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    const { disabled } = this.props;
    return (
      <form id="task-form-form">
        <div className="task-form-field-div">
          <Field
            name="name"
            component={this.renderNameField()}
            type="text"
            props={{
              inputProps: {
                placeholder: "Task Name",
                className: "text-field form-name-field",
                id: "task-name-field",
                maxLength: "30",
                autoComplete: "off",
                autoFocus: true
              },
              labelProps: {
                text: "Task Name *",
                class: "form-label block"
              }
            }}
          />
        </div>
        <div className="task-form-field-div">
          <Field
            name="description"
            component={this.renderTextArea}
            props={{
              inputProps: {
                placeholder: "Task Description",
                className: "text-field form-description-field",
                id: "task-description-field",
                maxLength: "100",
                autoComplete: "off"
              },
              labelProps: {
                text: "Task Description",
                class: "form-label block"
              }
            }}
          />
        </div>
        <div className="task-form-field-div" id="date-time-flex">
          <div className="date-time-flex-item">
            <Field
              name="date"
              component={this.renderInput}
              props={{
                inputProps: {
                  placeholder: "Date",
                  className: "text-field form-date-field",
                  id: "task-date-field",
                  type: "date",
                  min: getCurrentDate(),
                  required: true
                },
                labelProps: {
                  text: "Date",
                  class: "form-label block"
                }
              }}
            />
          </div>
          <div className="date-time-flex-item">
            <Field
              name="time"
              component={this.renderInput}
              props={{
                inputProps: {
                  placeholder: "Time",
                  className: "text-field form-time-field",
                  id: "task-time-field",
                  type: "time",
                  autoComplete: "off",
                  required: true
                },
                labelProps: {
                  text: "Time",
                  class: "form-label block"
                }
              }}
            />
          </div>
        </div>
        <div className="task-form-field-div">
          <Field
            name="priority"
            component={this.renderSelect}
            props={{
              inputProps: {
                placeholder: "Task Priority",
                className: "text-field form-priority-field",
                id: "task-priority-field"
              },
              labelProps: {
                text: "Task Priority",
                class: "form-label block"
              }
            }}
          />
        </div>
        <div className="task-form-field-div" id="task-form-checkbox-div">
          <Field
            name="finished"
            component={this.renderInput}
            type="checkbox"
            props={{
              inputProps: {
                className: "form-checkbox",
                id: "task-form-checkbox",
                type: "checkbox",
                onClick: e => {
                  const target = e.target;
                  this.setState({ finished: !this.state.finished });
                  // if(this.props.toggleCheckbox) {}
                  target.blur();
                  setTimeout(() => {
                    target.focus();
                  }, 0);
                }
              },
              labelProps: {
                text: "Finished",
                class: "form-label checkbox-label",
                id: "task-form-checkbox-label"
              }
            }}
          />
        </div>
        <div
          className="two-buttons-container"
          id="task-form-buttons-container"
          style={this.hideButtons()}
        >
          <ModalCancelButton
            onClose={() => {
              this.props.onClose();
            }}
          />

          <button
            type="submit"
            className="form-submit modal-action-button"
            id="task-form-submit"
            onClick={this.props.handleSubmit(this.onSubmit)}
          >
            {/* <img
              src={submitImg}
              alt="Submit Logo"
              className="submit-icon-image"
            ></img> */}
            <span className="submit-button-text">Submit</span>{" "}
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
