import "./TaskItem.css";
import PencilImg from "../../images/rename.png";
import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";
import EditTask from "../forms/tasks/EditTask";
import { toggleTaskCheck, deleteTask } from "../../actions";

class TaskItem extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      edit: false,
      delete: false
    }
  };
  componentDidMount() {}

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
              Delete Task
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  };

  // This honestly could be recycled instead as a general helper function
  // on second thought it's harder than it seems
  onModalOpen = event => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;

    if (target.hasChildNodes()) {
      if (target.classList.contains("edit-button")) {
        if (!this.state.modalsOpened.edit) {
          this.setState({ modalsOpened: { edit: true, any: true } });
        }
      } else if (target.classList.contains("delete-button")) {
        if (!this.state.modalsOpened.delete) {
          this.setState({ modalsOpened: { delete: true, any: true } });
        }
      }
    } else if (!target.hasChildNodes()) {
      if (target.parentElement.classList.contains("edit-button")) {
        if (!this.state.modalsOpened.edit) {
          this.setState({ modalsOpened: { edit: true, any: true } });
        }
      } else if (target.parentElement.classList.contains("delete-button")) {
        if (!this.state.modalsOpened.delete) {
          this.setState({ modalsOpened: { delete: true, any: true } });
        }
      }
    }

    return null;
  };

  // This also could be recyclable
  renderModal = () => {
    if (this.state.modalsOpened.edit) {
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
        >
          <div className="item-flex task">
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
            <div className="description-text task">{this.props.task.name}</div>
            <span className="task list-buttons-container">
              <button
                onClick={this.onModalOpen}
                className="task edit-button icon-button"
              >
                <img className="icon-image" src={PencilImg} alt="Pencil" />
              </button>
              <button
                onClick={this.onModalOpen}
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
