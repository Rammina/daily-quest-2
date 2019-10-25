import React from "react";
import { connect } from "react-redux";
import { createProject } from "../../actions";

import ProjectForm from "./ProjectForm";
import ModalCloseButton from "../Modal/common/ModalCloseButton";

class CreateProject extends React.Component {
  onSubmit = formValues => {
    this.props.createProject(formValues);
  };

  render() {
    return (
      <React.Fragment>
        <ModalCloseButton onClose={this.props.onClose} />
        <h1 className="modal-header">Create New Project</h1>
        <ProjectForm onSubmit={this.onSubmit} onClose={this.props.onClose} />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { createProject }
)(CreateProject);
