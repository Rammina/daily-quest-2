import { format, endOfYesterday, isBefore } from "date-fns";
import {
  getCurrentDate,
  getCurrentTime,
  toMilitaryTime
} from "../../../helpers";
import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { editTask, editDueTodayTask } from "../../../actions";
import TaskForm from "./TaskForm";

import ModalCloseButton from "../../Modal/common/ModalCloseButton";

class EditTask extends React.Component {
  processEmptyOptionals = formValues => {
    const description = formValues.description || "No description provided.";
    const date = formValues.date || getCurrentDate();
    const time =
      formValues.time || format(new Date(`${getCurrentDate()}T23:59`), "HH:mm");
    const priority = formValues.priority || "medium";
    const finished = formValues.finished || false;
    return { ...formValues, description, date, time, priority, finished };
  };

  onSubmit = async formValues => {
    const processedValues = this.processEmptyOptionals(formValues);
    const date = format(
      new Date(processedValues.date.replace(/-/g, "/")),
      "yyyy-MM-dd"
    );
    const time = format(
      new Date(`${getCurrentDate()}T${processedValues.time}`),
      "HH:mm"
    );
    const reformattedValues = { ...processedValues, date, time };
    await this.props.editTask(
      this.props.projectId,
      this.props.taskId,
      reformattedValues
    );
    if (this.props.dueTodayIndex) {
      await this.props.editDueTodayTask(
        this.props.dueTodayIndex,
        reformattedValues
      );
    }

    this.props.onClose();
    // this.props.fetchProject(this.props.match.params.id);
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

export default connect(null, { editTask, editDueTodayTask })(EditTask);
