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
import {
  toggleTaskCheck,
  deleteTask,
  deleteFinishedTask,
  deleteDueTodayTask,
  toggleDueTodayTaskCheck
} from "../../actions";
import { convertToMDY, ellipsifyString, toStandardTime } from "../../helpers";

import { ElementsContext } from "../AppContext";

class TaskItem extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      edit: false,
      delete: false,
      details: false
    },
    focusTaskContentOnClose: false,
    backdropClass: null
  };
  static contextType = ElementsContext;

  // refs(outside constructor)
  taskContentRef = null;
  editButtonRef = React.createRef();
  deleteButtonRef = React.createRef();

  // // callback version
  setTaskContentRef = ref => {
    this.taskContentRef = ref;
  };

  // focus methods
  focusTaskContent = () => {
    /* guard against undefined*/
    if (this.taskContentRef) {
      this.taskContentRef.focus();
      this.setState({ focusTaskContentOnClose: false });
    }
  };

  focusEditButton = () => {
    this.editButtonRef.current.focus();
  };

  focusDeleteButton = () => {
    this.deleteButtonRef.current.focus();
  };

  // settings component methods
  closeSettings = () => {
    if (this.props.closeSettings) this.props.closeSettings();
    return null;
  };

  hideActionButtons = () => {
    return this.props.hideActionButtons ? { visibility: "hidden" } : {};
  };

  renderActionButtons = () => {
    const renderEdit = () => {
      if (this.props.hideEditButton) {
        return null;
      }
      return (
        <button
          ref={this.editButtonRef}
          className="task edit-button icon-button"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            this.onModalOpen("edit");
            this.props.closeSettings();
          }}
        >
          <img className="icon-image" src={PencilImg} alt="Pencil" />
        </button>
      );
    };
    const renderDelete = () => {
      if (this.props.hideDeleteButton) {
        return null;
      }
      return (
        <button
          ref={this.deleteButtonRef}
          className="task delete-button icon-button"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            this.onModalOpen("delete");
            this.props.closeSettings();
          }}
        >
          <img className="icon-image" src={TrashImg} alt="Trash Can" />
        </button>
      );
    };
    return (
      <span
        style={this.hideActionButtons()}
        className="task list-buttons-container"
      >
        {renderEdit()}
        {renderDelete()}
      </span>
    );
  };

  renderCheckbox = () => {
    const { task } = this.props;
    if (this.props.hideCheckbox) {
      return null;
    }
    return (
      <input
        className="task list-checkbox"
        type="checkbox"
        defaultChecked={task.finished || false}
        onClick={e => {
          e.stopPropagation();
          const target = e.target;
          this.props.toggleTaskCheck(
            this.props.projectId,
            this.props.taskId,
            target.checked
          );
          if (this.props.dueTodayIndex) {
            this.props.toggleDueTodayTaskCheck(
              this.props.dueTodayIndex,
              target.checked
            );
          }
        }}
      ></input>
    );
  };

  renderInfoBubble = () => {
    const renderProjectName = () => {
      if (this.props.hideProjectName) {
        return null;
      }
      return (
        <span className="tasklist-project-name">{this.props.projectName}</span>
      );
    };
    const renderDate = () => {
      if (this.props.hideDate) {
        return null;
      }
      return (
        <span className="tasklist-date">
          {convertToMDY(this.props.task.date)}{" "}
        </span>
      );
    };
    const renderTime = () => {
      if (this.props.hideTime) {
        return null;
      }
      return (
        <span className="time-hide-mobile tasklist-time">
          {" "}
          - {toStandardTime(this.props.task.time)}
        </span>
      );
    };
    return (
      <span className="project-date-time-span">
        {renderProjectName()}
        {renderDate()}
        {renderTime()}
      </span>
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
            <ModalCancelButton
              onClose={this.dismissModalHandler}
              autoFocus={true}
            />

            <button
              ref={this.context.setModalTasksDeleteButtonRef}
              className="modal-action-button delete-confirm-button"
              onClick={async () => {
                await this.props.deleteTask(
                  this.props.projectId,
                  this.props.taskId
                );
                // indexes for both finished and today
                if (this.props.finishedIndex) {
                  this.props.deleteFinishedTask(this.props.finishedIndex);
                }
                if (this.props.dueTodayIndex) {
                  this.props.deleteDueTodayTask(this.props.dueTodayIndex);
                }
                this.dismissModalHandler();
              }}
              onKeyDown={e => {
                if (e.key === "Tab" && !e.shiftKey) {
                  e.preventDefault();
                  e.stopPropagation();
                  // put the element to focus here
                  if (this.context.modalCloseButtonRef) {
                    this.context.modalCloseButtonRef.focus();
                  }
                }
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

  onModalOpen = modalType => {
    if (!this.state.modalsOpened.any) {
      this.setState({ modalsOpened: { [modalType]: true, any: true } });
    }
  };

  switchModalHandler = modalType => {
    this.dismissModalHandler();
    setTimeout(() => {
      this.setState({ modalsOpened: { [modalType]: true, any: true } });
    }, 205);
  };

  // This also could be recyclable
  renderModal = () => {
    if (this.state.modalsOpened.details) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="details-task-content"
          content={() => {
            return (
              <TaskDetails
                // focus
                focusTaskContent={this.focusTaskContent}
                focusTaskContentOnClose={this.state.focusTaskContentOnClose}
                // modal functions
                onClose={() => {
                  this.dismissModalHandler();
                  setTimeout(() => {
                    this.focusTaskContent();
                  }, 200);
                }}
                switchModal={this.switchModalHandler}
                // conditional rendering
                hideActionEdit={this.props.hideEditButton}
                // task and project information
                task={this.props.task}
                projectId={this.props.projectId}
                taskId={this.props.taskId}
              />
            );
          }}
          onDismiss={() => {
            this.dismissModalHandler();
            setTimeout(() => {
              this.focusTaskContent();
            }, 200);
          }}
        />
      );
    } else if (this.state.modalsOpened.edit) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="edit-task-content"
          content={() => {
            return (
              <EditTask
                task={this.props.task}
                onClose={() => {
                  this.dismissModalHandler();
                  if (this.state.focusTaskContentOnClose) {
                    setTimeout(() => {
                      this.focusTaskContent();
                    }, 200);
                  } else {
                    setTimeout(() => {
                      this.focusEditButton();
                    }, 200);
                  }
                }}
                projectId={this.props.projectId}
                taskId={this.props.taskId}
                dueTodayIndex={this.props.dueTodayIndex}
              />
            );
          }}
          onDismiss={() => {
            this.dismissModalHandler();
            if (this.state.focusTaskContentOnClose) {
              setTimeout(() => {
                this.focusTaskContent();
              }, 200);
            } else {
              setTimeout(() => {
                this.focusEditButton();
              }, 200);
            }
          }}
        />
      );
    } else if (this.state.modalsOpened.delete) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="delete-task-content"
          content={this.renderDeleteContent}
          onDismiss={() => {
            this.dismissModalHandler();
            if (this.state.focusTaskContentOnClose) {
              setTimeout(() => {
                this.focusTaskContent();
              }, 200);
            } else {
              setTimeout(() => {
                this.focusDeleteButton();
              }, 200);
            }
          }}
        />
      );
    }
    return null;
  };

  // We already recycle this
  dismissModalHandler = () => {
    this.setState({ backdropClass: "closed" });
    const modalsOpened = _.mapValues(this.state.modalsOpened, () => false);
    setTimeout(() => {
      this.setState({
        modalsOpened,
        backdropClass: null
      });
    }, 201);
  };

  render() {
    const modalContent = this.renderModal();
    const { task } = this.props;

    // change the indicator color depending on priority
    const renderPriorityColor = () => {
      if (task.priority === "high") {
        return "#ff807b";
      } else if (task.priority === "medium") {
        return "#f7bd9b";
      } else if (task.priority === "low") {
        return "#fffbdb";
      }
    };

    return (
      <React.Fragment>
        <div
          ref={this.setTaskContentRef}
          tabIndex="0"
          className="task content"
          key={`${task.name}-${task.id}`}
          onClick={e => {
            if (!this.state.modalsOpened.details) {
              this.setState({
                modalsOpened: { any: true, details: true },
                selectedTask: task,
                focusTaskContentOnClose: true
              });
            }
          }}
        >
          <div
            style={{
              backgroundColor: renderPriorityColor(),
              height: "3rem",
              width: "0.6rem",
              position: "absolute",
              left: "0.3rem",
              marginTop: "0rem",
              borderRadius: "3px"
            }}
          ></div>
          <div className="item-flex task">
            {this.renderCheckbox()}
            <div className="description-text task">
              {ellipsifyString(task.name, 25)} {this.renderInfoBubble()}
            </div>

            {this.renderActionButtons()}
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
  mapStateToProps,
  {
    deleteTask,
    toggleTaskCheck,
    deleteFinishedTask,
    deleteDueTodayTask,
    toggleDueTodayTaskCheck
  }
)(TaskItem);
