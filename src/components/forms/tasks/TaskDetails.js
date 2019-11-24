import trashImg from "../../../images/trash.png";
import wrenchImg from "../../../images/wrench.png";

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
        <TaskForm
          // onSubmit={this.onSubmit}
          onClose={this.props.onClose}
          initialValues={{ ...this.props.task }}
          disabled={true}
          hideButtons="true"
        />
        <div
          className="two-buttons-container"
          id="task-details-buttons-container"
        >
          <button
            className="details modal-action-button edit-modal-button"
            onClick={() => {
              this.props.switchModal("edit");
            }}
          >
            <img
              className="wrench modal-button-image"
              src={wrenchImg}
              alt="Wrench"
            />
            <span className="modal-button-text">Edit Task</span>
          </button>
          <button
            className="details modal-action-button delete-confirm-button"
            onClick={() => {
              this.props.switchModal("delete");
            }}
          >
            <img
              className="trash modal-button-image"
              src={trashImg}
              alt="Trashcan"
            />
            <span className="modal-button-text">Delete Task</span>
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  null
  // { editProject, fetchProject }
)(TaskDetails);
