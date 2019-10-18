import React from "react";
import { Field, reduxForm } from "redux-form";

class EditProject extends React.Component {
  renderInput({ input }) {
    return (
      <input
        id="edit-project-title-field"
        className="edit-project-modal required text-field"
        type="text"
        name="project-title"
        placeholder="Project Title"
        maxLength="30"
        required="true"
        value={this.props.project.name}
      />
    );
  }

  onSubmit = formValues => {};

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        id="edit-project-form"
      >
        <div id="edit-project-field-div">
          <Field name="title" component={this.renderInput} />
        </div>

        <div
          className="two-buttons-container"
          id="edit-project-buttons-container"
        >
          <button
            className="modal-action-button cancel-button"
            id="edit-project-cancel"
          >
            Cancel
          </button>

          <input
            type="submit"
            className="form-submit"
            id="edit-project-submit"
            value="Submit"
          />
        </div>
      </form>
    );
  }
}

const validate = formValues => {};

export default reduxForm({
  form: editProject
})(EditProject);
