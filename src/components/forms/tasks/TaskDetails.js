import TrashImg from "../../../images/trash.png";
import WrenchImg from "../../../images/wrench.png";

import _ from "lodash";
import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
// import { fetchProject, editProject } from "../../actions";
import TaskForm from "./TaskForm";

class TaskDetails extends React.Component {
  renderActionButtons = () => {
    // Instead of both, should be able to pick buttons One by one
    // Use different conditions for each button rendering
    if (!this.props.hideActionButtons) {
      const renderDelete = () => {
        if (!this.props.hideActionDelete && !this.props.hideActionEdit) {
          return (
            <button
              className="details modal-action-button delete-confirm-button"
              onClick={() => {
                this.props.switchModal("delete");
              }}
            >
              Delete Task
            </button>
          );
        } else if (!this.props.hideActionDelete && this.props.hideActionEdit) {
          return (
            <button
              className="modal-action-button delete-confirm-button no-edit"
              onClick={() => {
                this.props.switchModal("delete");
              }}
            >
              <img
                id="delete-trash-icon"
                className="trash modal-button-image no-edit"
                src={TrashImg}
                alt="Trashcan"
              />
              <span style={{ position: "relative", left: "0.6rem" }}>
                Delete Task
              </span>
            </button>
          );
        }
        return null;
      };
      const renderEdit = () => {
        if (!this.props.hideActionEdit) {
          return (
            <button
              className="details modal-action-button edit-modal-button"
              onClick={() => {
                this.props.switchModal("edit");
              }}
            >
              <img
                id="edit-wrench-icon"
                className="wrench modal-button-image"
                src={WrenchImg}
                alt="Wrench"
              />
              <span className="modal-button-text">Edit Task</span>
            </button>
          );
        }
        return null;
      };
      return (
        <div
          className="two-buttons-container"
          id="task-details-buttons-container"
        >
          {renderDelete()}
          {renderEdit()}
        </div>
      );
    }
    return null;
  };

  onSubmit = async formValues => {
    // await this.props.editProject(this.props.id, formValues);
    this.props.onClose();
  };

  render() {
    return (
      <React.Fragment>
        <TaskForm
          // onSubmit={this.onSubmit}
          onClose={() => {
            this.props.onClose();
            if (this.props.focusTaskContent) {
              setTimeout(() => {
                this.props.focusTaskContent();
              }, 200);
            }
          }}
          initialValues={{ ...this.props.task }}
          disabled={true}
          hideButtons="true"
        />
        {this.renderActionButtons()}
      </React.Fragment>
    );
  }
}

export default connect(
  null
  // { editProject, fetchProject }
)(TaskDetails);
