import _ from 'lodash';
import React from "react";
import { Field, reduxForm } from "redux-form";
import {connect} from "react-redux";
// import {fetchProject, editProject} from "../../actions";
import ProjectForm from './ProjectForm';

import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";

class EditProject extends React.Component {

  onSubmit = (formValues) => {
  	this.props.editProject(this.props.match.params.id, formValues);
  };

  render() {
    return (
      <React.Fragment>
      	<ModalCloseButton onClose={this.props.onClose} />
      	<h1 className="modal-header">Create New Project</h1>
      	<ProjectForm onSubmit={this.onSubmit} onClose={this.props.onClose} initialValues={_.pick(this.props.project, 'title')}/>      
      </React.Fragment>
    );
  }
}

	
export default connect(
	null,
	{editProject}
)(EditProject);