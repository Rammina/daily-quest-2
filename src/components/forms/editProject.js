import React from "react";
import { Field, reduxForm } from "redux-form";
import {connect} from "react-redux";
// import {editProject} from "../../actions";

import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";

class EditProject extends React.Component {

	renderError = ({error, touched}/*deconstructed meta object*/) => {
		if(error && touched) {
			return <div>{error}</div>;
		}
		return null;
	}

  renderInput = ({ input, meta }) =>{
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
        autoComplete="off"
      />
      {this.renderError(meta)}
    );
  }

  onSubmit = formValues => {
  		
  };

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
        	<ModalCancelButton onClose={this.props.onClose} />
          
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

const validate = formValues => {
	const errors = {}
	if(!formValues.title) {
		errors.title = 'Please input a title for the project.';

	}
	return errors;
};

const formWrapped = reduxForm({
  form: 'editProject',
  validate
})(EditProject);

export default connect(
	null,
	{editProject}
)(formWrapped);