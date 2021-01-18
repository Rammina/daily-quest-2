import React from "react";
import { connect } from "react-redux";
import { createProject } from "../../../actions";

import ProjectForm from "./ProjectForm";

class CreateProject extends React.Component {
  onSubmit = async (formValues) => {
    await this.props.createProject(this.props.auth.userId, formValues);
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

const mapStateToProps = (state) => {
  return {
    auth: { ...state.auth.user },
  };
};

export default connect(mapStateToProps, { createProject })(CreateProject);
