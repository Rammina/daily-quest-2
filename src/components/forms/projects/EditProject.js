import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchProject, editProject } from "../../../actions";
import ProjectForm from "./ProjectForm";

import ModalCloseButton from "../../Modal/common/ModalCloseButton";

class EditProject extends React.Component {
  onSubmit = async formValues => {
    await this.props.editProject(
      this.props.googleAuth.userId,
      this.props.id,
      formValues
    );
    this.props.onClose();
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="modal-header">Rename Project</h1>
        <ProjectForm
          onSubmit={this.onSubmit}
          onClose={this.props.onClose}
          initialValues={_.pick(this.props.project, "name")}
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
  { editProject, fetchProject }
)(EditProject);
