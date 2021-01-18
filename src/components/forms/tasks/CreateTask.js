import { format } from "date-fns";
import { getCurrentDate } from "../../../helpers";
import _ from "lodash";

import React from "react";
import { connect } from "react-redux";
import { createTask } from "../../../actions";
import TaskForm from "./TaskForm";

class CreateTask extends React.Component {
  processEmptyOptionals = (formValues) => {
    const description = formValues.description || "No description provided.";
    const date = formValues.date || getCurrentDate();
    console.log(date);
    const time =
      formValues.time || format(new Date(`${getCurrentDate()}T23:59`), "HH:mm");
    const priority = formValues.priority || "medium";
    const finished = formValues.finished || false;
    return { ...formValues, description, date, time, priority, finished };
  };

  onSubmit = async (formValues) => {
    const processedValues = this.processEmptyOptionals(formValues);
    const date = format(
      new Date(processedValues.date.replace(/-/g, "/")),
      "yyyy-MM-dd"
    );

    console.log(processedValues.date);
    console.log(date);
    const time = format(
      new Date(`${getCurrentDate()}T${processedValues.time}`),
      "HH:mm"
    );
    const reformattedValues = { ...processedValues, date, time };
    await this.props.createTask(
      this.props.auth.userId,
      this.props.id,
      reformattedValues
    );
    this.props.onClose();
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="modal-header">Create Task</h1>
        <TaskForm onSubmit={this.onSubmit} onClose={this.props.onClose} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: { ...state.auth.user },
  };
};

export default connect(mapStateToProps, { createTask })(CreateTask);
