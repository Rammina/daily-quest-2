import React from "react";
import { connect } from "react-redux";
import { createProject } from "../../actions";

import ProjectForm from "./ProjectForm";
import ModalCloseButton from "../Modal/common/ModalCloseButton";

class CreateProject extends React.Component {
  onSubmit = async (formValues, id) => {
    console.log(formValues);
    const valuesWithId = { ...formValues, id };
    console.log(valuesWithId);
    await this.props.createProject(valuesWithId);
    console.log("dismissed");
    this.props.onClose();
  };

  render() {
    return (
      <React.Fragment>
        <ModalCloseButton onClose={this.props.onClose} />
        <h1 className="modal-header">Create New Project</h1>
        <ProjectForm
          onSubmit={this.onSubmit}
          onClose={() => {
            console.log("onClose dismissed");
            this.props.onClose();
          }}
          id={this.props.id}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { createProject }
)(CreateProject);
