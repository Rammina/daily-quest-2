import _ from "lodash";
import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
// import { fetchProject, editProject } from "../../actions";
import TaskForm from "./TaskForm";

import ModalCloseButton from "../../Modal/common/ModalCloseButton";

class TaskDetails extends React.Component {
  onSubmit = async formValues => {
    // await this.props.editProject(this.props.id, formValues);
    this.props.onClose();
  };

  render() {
    return (
      <React.Fragment>
        <ModalCloseButton onClose={this.props.onClose} />
        <h1 className="modal-header">{this.props.task.name}</h1>
        <TaskForm
          // onSubmit={this.onSubmit}
          onClose={this.props.onClose}
          initialValues={{ ...this.props.task }}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null
  // { editProject, fetchProject }
)(TaskDetails);
