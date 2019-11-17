import _ from "lodash";
import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { fetchTask, editTask } from "../../actions";
import TaskForm from "./TaskForm";

import ModalCloseButton from "../Modal/common/ModalCloseButton";

class EditTask extends React.Component {
  onSubmit = async formValues => {
    await this.props.editTask(this.props.id, formValues);
    this.props.onClose();
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="modal-header">Edit Task</h1>
        <TaskForm
          onSubmit={this.onSubmit}
          onClose={this.props.onClose}
          initialValues={{ ...this.props.task }}
        />
      </React.Fragment>
    );
  }
}

export default connect(null, { editTask, fetchTask })(EditTask);
