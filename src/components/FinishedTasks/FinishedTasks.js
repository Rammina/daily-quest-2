import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";

import TaskItem from "../TaskItem/TaskItem.js";
import ListLoader from "../ListLoader/ListLoader";
import DeleteAll from "../forms/commonModals/DeleteAll";
import Modal from "../Modal/Modal";
import Settings from "../Settings/Settings";

import {
  fetchFinishedTasks,
  deleteTask,
  deleteFinishedTask,
  deleteAllFinishedTasks,
  sortFinishedTasksByName,
  sortFinishedTasksByDate,
  sortFinishedTasksByPriority,
} from "../../actions";
import { ellipsifyString } from "../../helpers/index.js";

class FinishedTasks extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      details: false,
      deleteAll: false,
      settings: false,
    },
    selectedTask: null,
    backdropClass: null,
    settingsBackdropClass: null,
    settingsEllipsisClass: null,
    showLoader: true,
  };

  componentDidMount() {
    if (!this.props.isSignedIn) {
      history.push("/login-page");
    }
    (async () => {
      await this.props.fetchFinishedTasks(this.props.auth.userId);
      this.setState({ showLoader: false });
    })();
  }

  componentDidUpdate() {}

  // // using the callback version here because it's much more customizable
  setEllipsisRef = (ref) => {
    this.ellipsisButtonRef = ref;
  };

  // focus methods
  focusEllipsisButton = () => {
    if (this.ellipsisButtonRef) {
      //guard
      // callback focus of ref
      this.ellipsisButtonRef.focus();
    }
  };

  handleSettingsClose = () => {
    if (this.state.modalsOpened.settings) {
      this.setState({
        settingsBackdropClass: "closed",
        settingsEllipsisClass: null,
      });
      setTimeout(() => {
        this.setState({
          modalsOpened: { ...this.state.modalsOpened, settings: false },
          settingsBackdropClass: null,
        });
      }, 200);
    }
  };

  handleSettingsOpen = () => {
    if (!this.state.modalsOpened.settings) {
      this.setState({
        modalsOpened: { settings: true },
        settingsEllipsisClass: "selected",
      });
    }
  };

  handleDeleteAll = () => {
    this.props.deleteAllFinishedTasks();
  };

  onModalOpen = (event, modalType) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      modalsOpened: { any: true, [modalType]: true },
    });
  };

  renderTasks = () => {
    const tasks = this.props.finishedTasks;

    if (this.state.showLoader) {
      return (
        <div
          style={{
            color: "#f8eeee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "3rem",
            fontSize: "1.3rem",
          }}
        >
          LOADING...
        </div>
      );
    }

    if (Object.keys(tasks).length >= 1) {
      return tasks.map((task, index) => (
        <div
          key={task.id}
          tabIndex="0"
          className="task item list-header task-item-details"
        >
          <TaskItem
            hideDate={true}
            hideTime={true}
            hideCheckbox={true}
            task={task}
            taskId={task.id}
            finishedIndex={index + ""}
            projectId={task.projectId}
            projectName={ellipsifyString(task.projectName, 13)}
            // hideActionButtons={true}
            hideEditButton={true}
            closeSettings={() => this.handleSettingsClose()}
          />
        </div>
      ));
    } else {
      return (
        <div
          style={{
            color: "#f8eeee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "3rem",
            fontSize: "1.3rem",
          }}
        >
          There are no tasks found.
        </div>
      );
    }
  };

  renderModal = () => {
    if (this.state.modalsOpened.deleteAll) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="delete-all-finished-tasks-content"
          content={() => (
            <DeleteAll
              itemName="Finished Tasks"
              dataObject={this.props.finishedTasks}
              onClose={() => {
                this.dismissModalHandler();
                this.focusEllipsisButton();
              }}
              deleteFunction={async () => {
                const tasks = this.props.finishedTasks;
                const deleteAllFinishedTasks = async () => {
                  for (let task of tasks) {
                    await this.props.deleteTask(
                      this.props.auth.userId,
                      task.projectId,
                      task.id
                    );
                    // this.props.deleteFinishedTask(task.id);
                  }
                };
                await deleteAllFinishedTasks();
                await this.props.deleteAllFinishedTasks();
                this.dismissModalHandler();
                this.focusEllipsisButton();
              }}
            />
          )}
          onDismiss={() => {
            this.dismissModalHandler();
            this.focusEllipsisButton();
          }}
        />
      );
    }
    return null;
  };

  dismissModalHandler = () => {
    this.setState({ backdropClass: "closed" });
    const modalsOpened = _.mapValues(this.state.modalsOpened, () => false);
    setTimeout(() => {
      this.setState({
        modalsOpened,
        backdropClass: null,
      });
    }, 201);
  };

  render() {
    return (
      <React.Fragment>
        <div
          data-test="component-tasks"
          className="tasks-container"
          onClick={() => {
            this.handleSettingsClose();
          }}
        >
          <div id="tasks-list" className="todolist ui segment">
            <div className="ui relaxed divided list">
              <ListLoader showLoader={this.state.showLoader} />
              <div className="task item list-header first">
                <div className="task content">
                  <div className="header header-text task">FINISHED TASKS</div>
                </div>
                <div style={{ width: "6rem", height: "3.1rem" }}>
                  <Settings
                    // ref and focus functions
                    setEllipsisRef={this.setEllipsisRef}
                    focusEllipsisButton={this.focusEllipsisButton}
                    // modal functions
                    isModalOpen={this.state.modalsOpened.settings}
                    openModal={this.handleSettingsOpen}
                    closeModal={this.handleSettingsClose}
                    backdropClass={this.state.settingsBackdropClass}
                    ellipsisClass={this.state.settingsEllipsisClass}
                    settingItems={[
                      {
                        text: "Sort ascending (name)",
                        method: () => {
                          this.props.sortFinishedTasksByName(
                            this.props.auth.userId,
                            this.props.finishedTasks
                          );
                        },
                      },

                      {
                        text: "Sort ascending (date)",
                        method: () => {
                          this.props.sortFinishedTasksByDate(
                            this.props.auth.userId,
                            this.props.finishedTasks
                          );
                        },
                      },
                      {
                        text: "Sort ascending (priority)",
                        method: () => {
                          this.props.sortFinishedTasksByPriority(
                            this.props.auth.userId,
                            this.props.finishedTasks
                          );
                        },
                      },
                      {
                        text: "Sort descending (name)",
                        method: () => {
                          this.props.sortFinishedTasksByName(
                            this.props.auth.userId,
                            this.props.finishedTasks,
                            "descending"
                          );
                        },
                      },
                      {
                        text: "Sort descending (date)",
                        method: () => {
                          this.props.sortFinishedTasksByDate(
                            this.props.auth.userId,
                            this.props.finishedTasks,
                            "descending"
                          );
                        },
                      },
                      {
                        text: "Sort descending (priority)",
                        method: () => {
                          this.props.sortFinishedTasksByPriority(
                            this.props.auth.userId,
                            this.props.finishedTasks,
                            "descending"
                          );
                        },
                      },

                      {
                        text: "Delete all tasks",
                        method: (e) => {
                          this.onModalOpen(e, "deleteAll");
                          this.handleSettingsClose();
                        },
                      },
                    ]}
                  />
                </div>
              </div>
              {this.renderTasks()}
            </div>
          </div>
        </div>
        {this.renderModal()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    finishedTasks: state.finishedTasks,
    auth: { ...state.auth.user },
  };
};

export default connect(mapStateToProps, {
  fetchFinishedTasks,
  deleteTask,
  deleteFinishedTask,
  deleteAllFinishedTasks,
  sortFinishedTasksByName,
  sortFinishedTasksByDate,
  sortFinishedTasksByPriority,
})(FinishedTasks);
