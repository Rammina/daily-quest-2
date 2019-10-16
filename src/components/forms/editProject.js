import React from "react";
import { Field, reduxForm} from 'redux-form';

class EditProject extends React.Component {
	renderInput({ input }) {
		return (
			<input
				{...input}
              id="edit-project-title-field"
              className="edit-project-modal required text-field"
              type="text"
              name="project-title"
              placeholder="Project Title"
              maxlength="30"
              required="true"
              value={this.props.project.name}

            />
		);
	}

	render(){
		return (
		<form id="edit-project-form" onSubmit={}>
          <div id="edit-project-field-div">
          	<Field name="title" component={this.renderInput}>
              
          </div>

          <input
            type="submit"
            className="form-submit"
            id="edit-project-submit"
            value="Add This Project"
          />
        </form>
		);
	}
}

export default reduxForm({
	form: editProject
})(EditProject);