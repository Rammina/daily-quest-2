import { format, endOfYesterday, isBefore } from "date-fns";
import {
  getCurrentDate,
  getCurrentTime,
  toMilitaryTime
} from "../../../helpers";
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { createTask } from "../../../actions";
import TaskForm from "./TaskForm";

import ModalCloseButton from "../../Modal/common/ModalCloseButton";

class CreateTask extends React.Component {
  onSubmit = async formValues => {
    console.log(formValues);
    const date = format(new Date(formValues.date), "YYYY-MM-DD");
    console.log(date);
    const time = format(
      new Date(`${getCurrentDate}T${formValues.time}`),
      "hh:mmA"
    );
    const reformattedValues = { ...formValues, date, time };
    await this.props.createTask(this.props.id, reformattedValues);
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
