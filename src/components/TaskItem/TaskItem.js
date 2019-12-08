import "./TaskItem.css";
import PencilImg from "../../images/rename.png";
import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import Modal from "../Modal/Modal";
import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";

import TaskDetails from "../forms/tasks/TaskDetails";
import EditTask from "../forms/tasks/EditTask";
import { toggleTaskCheck, deleteTask } from "../../actions";
import { convertToMDY, toStandardTime } from "../../helpers";

class TaskItem extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      edit: false,
      delete: false,
      details: false
    }
  };
  componentDidMount() {}

  hideActionButtons = () => {
    return this.props.hideActionButtons ? { visibility: "hidden" } : {};
  };

  renderCheckbox = () => {
    if (this.props.hideCheckbox) {
      return null;
    }
    return (
      <input
        className="task list-checkbox"
        type="checkbox"
        defaultChecked={this.props.task.finished || false}
        onClick={e => {
          e.stopPropagation();
          const target = e.target;
          this.props.toggleTaskCheck(
            this.props.projectId,
            this.props.taskId,
            target.checked
          );
        }}
      ></input>
    );
  };

  renderDeleteContent = () => {
    return (
      <React.Fragment>
        <ModalCloseButton onClose={this.dismissModalHandler} />
        <h1 className="modal-header">Delete Task</h1>
        <form id="delete-task-form">
          <p className="modal-paragraph">Would you like to delete this task?</p>
          <p className="modal-paragraph modal-warning">
            WARNING: All deleted tasks' data cannot be recovered!
          </p>
          <p className="modal-paragraph delete-item-title">
            {this.props.task.name}
          </p>
          <div
            className="two-buttons-container"
            id="delete-task-buttons-container"
          >
            <ModalCancelButton onClose={this.dismissModalHandler} />

            <button
              className="modal-action-button delete-confirm-button"
              onClick={() => {
                this.props.deleteTask(this.props.projectId, this.props.taskId);
                this.dismissModalHandler();
              }}
            >
              <img
                id="delete-trash-icon"
                className="trash modal-button-image"
                src={TrashImg}
                alt="Trashcan"
              />
              <span className="modal-button-text">Delete</span>
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  };

  // This honestly could be recycled instead as a general helper function
  // on second thought it's harder than it seems
  // It's pretty easy
  onModalOpen = modalType => {
    if (!this.state.modalsOpened.any) {
      this.setState({ modalsOpened: { [modalType]: true, any: true } });
    }
  };

  switchModalHandler = modalType => {
    this.dismissModalHandler();
    setTimeout(() => {
      this.setState({ modalsOpened: { [modalType]: true, any: true } });
    }, 50);
  };

  // This also could be recyclable
  renderModal = () => {
    if (this.state.modalsOpened.details) {
      return (
        <Modal
          sectionId="details-task-content"
          content={() => {
            return (
              <TaskDetails
                onClose={this.dismissModalHandler}
                task={this.props.task}
                projectId={this.props.projectId}
                taskId={this.props.taskId}
                switchModal={this.switchModalHandler}
              />
            );
          }}
          onDismiss={() => {
            this.dismissModalHandler();
          }}
        />
      );
    } else if (this.state.modalsOpened.edit) {
      return (
        <Modal
          sectionId="edit-task-content"
          content={() => {
            return (
              <EditTask
                task={this.props.task}
                onClose={this.dismissModalHandler}
                projectId={this.props.projectId}
                taskId={this.props.taskId}
              />
            );
          }}
          onDismiss={this.dismissModalHandler}
        />
      );
    } else if (this.state.modalsOpened.delete) {
      return (
        <Modal
          sectionId="delete-task-content"
          content={this.renderDeleteContent}
          onDismiss={this.dismissModalHandler}
        />
      );
    }
    return null;
  };

  // We already recycle this
  dismissModalHandler = () => {
    const modalsOpened = _.mapValues(this.state.modalsOpened, () => false);
    this.setState({
      modalsOpened
    });
  };

  render() {
    const modalContent = this.renderModal();

    return (
      <React.Fragment>
        <div
          className="task content"
          key={`${this.props.task.name}-${this.props.task.id}`}
          onClick={e => {
            if (!this.state.modalsOpened.details) {
              this.setState({
                modalsOpened: { any: true, details: true },
                selectedTask: this.props.task
              });
            }
          }}
        >
          <div className="item-flex task">
            {this.renderCheckbox()}
            <div className="description-text task">
              {this.props.task.name}{" "}
              <span className="date-time-span">
                <span className="tasklist-date">
                  {convertToMDY(this.props.task.date)}{" "}
                </span>
                <span className="time-hide-mobile tasklist-time">
                  {" "}
                  - {toStandardTime(this.props.task.time)}
                </span>
              </span>
            </div>
            <span
              style={this.hideActionButtons()}
              className="task list-buttons-container"
            >
              <button
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.onModalOpen("edit");
                }}
                className="task edit-button icon-button"
              >
                <img className="icon-image" src={PencilImg} alt="Pencil" />
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.onModalOpen("delete");
                }}
                className="task delete-button icon-button"
              >
                <img className="icon-image" src={TrashImg} alt="Trash Can" />
              </button>
            </span>
          </div>
        </div>
        {modalContent}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { project: state.selectedProject };
};
export default connect(
  null,
  { deleteTask, toggleTaskCheck }
)(TaskItem);
