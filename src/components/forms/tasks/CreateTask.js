import { format, endOfYesterday, isBefore } from "date-fns";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { createTask } from "../../../actions";
import TaskForm from "./TaskForm";

import ModalCloseButton from "../../Modal/common/ModalCloseButton";

class CreateTask extends React.Component {
  onSubmit = async formValues => {
    const date = format(formValues.date, "YYYY-MM-DD");
    const reformattedValues = { ...formValues };
    await this.props.createTask(this.props.url, reformattedValues);
    this.props.onClose();
  };

  render() {
    return (
      <React.Fragment>
        <ModalCloseButton onClose={this.props.onClose} />
        <h1 className="modal-header">Create Task</h1>
        <TaskForm onSubmit={this.onSubmit} onClose={this.props.onClose} />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { createTask }
)(CreateTask);
