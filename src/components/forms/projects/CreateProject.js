import React from "react";
import { connect } from "react-redux";
import { createProject } from "../../../actions";

import ProjectForm from "./ProjectForm";
import ModalCloseButton from "../../Modal/common/ModalCloseButton";

class CreateProject extends React.Component {
  onSubmit = async formValues => {
    await this.props.createProject(this.props.googleAuth.userId, formValues);
    console.log("dismissed");
    this.props.onClose();
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="modal-header">New Project</h1>
        <ProjectForm
          closeButton={this.props.closeButton || null}
          onSubmit={this.onSubmit}
          onClose={() => {
            console.log("onClose dismissed");
            this.props.onClose();
          }}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    googleAuth: { ...state.googleAuth.user }
  };
};

export default connect(
  mapStateToProps,
  { createProject }
)(CreateProject);
