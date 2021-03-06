import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TaskItem from "../TaskItem/TaskItem.js";
import ListLoader from "../ListLoader/ListLoader";
import Settings from "../Settings/Settings";
import Modal from "../Modal/Modal";
import DeleteAll from "../forms/commonModals/DeleteAll";

import {
  fetchDueToday,
  deleteTask,
  deleteAllDueTodayTasks,
  sortDueTodayTasksByName,
  sortDueTodayTasksByDate,
  sortDueTodayTasksByPriority,
} from "../../actions";
import { ellipsifyString } from "../../helpers/index.js";

class DueToday extends React.Component {
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

  componentDidMount() {
    (async () => {
      await this.props.fetchDueToday(this.props.auth.userId);
      this.setState({ showLoader: false });
    })();
  }

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

  onModalOpen = (e, modalType) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      modalsOpened: { any: true, [modalType]: true },
    });
  };
  renderTasks = () => {
    const tasks = this.props.dueToday;

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
            task={task}
            taskId={task.id}
            dueTodayIndex={index + ""}
            projectId={task.projectId}
            projectName={ellipsifyString(task.projectName, 13)}
            closeSettings={() => this.handleSettingsClose()}
          />
        </div>
      ));
    }

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
  };

  renderModal = () => {
    if (this.state.modalsOpened.deleteAll) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="delete-all-due-today-content"
          content={() => (
            <DeleteAll
              itemName="today's tasks"
              dataObject={this.props.dueToday}
              onClose={() => {
                this.dismissModalHandler();
                this.focusEllipsisButton();
              }}
              deleteFunction={async () => {
                const tasks = this.props.dueToday;
                const deleteAllDueTodayTasks = async () => {
                  for (let task of tasks) {
                    await this.props.deleteTask(
                      this.props.auth.userId,
                      task.projectId,
                      task.id
                    );
                  }
                };
                await deleteAllDueTodayTasks();
                await this.props.deleteAllDueTodayTasks();
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
                  <div className="header header-text task">DUE TODAY</div>
                </div>
                <div style={{ width: "6rem", height: "3.1rem" }}>
                  <Settings
                    // ref and focus function
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
                          this.props.sortDueTodayTasksByName(
                            this.props.auth.userId,
                            this.props.dueToday
                          );
                        },
                      },
                      {
                        text: "Sort ascending (time)",
                        method: () => {
                          this.props.sortDueTodayTasksByDate(
                            this.props.auth.userId,
                            this.props.dueToday
                          );
                        },
                      },
                      {
                        text: "Sort ascending (priority)",
                        method: () => {
                          this.props.sortDueTodayTasksByPriority(
                            this.props.auth.userId,
                            this.props.dueToday
                          );
                        },
                      },
                      {
                        text: "Sort descending (name)",
                        method: () => {
                          this.props.sortDueTodayTasksByName(
                            this.props.auth.userId,
                            this.props.dueToday,
                            "descending"
                          );
                        },
                      },
                      {
                        text: "Sort descending (time)",
                        method: () => {
                          this.props.sortDueTodayTasksByDate(
                            this.props.auth.userId,
                            this.props.dueToday,
                            "descending"
                          );
                        },
                      },
                      {
                        text: "Sort descending (priority)",
                        method: () => {
                          this.props.sortDueTodayTasksByPriority(
                            this.props.auth.userId,
                            this.props.dueToday,
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
  return { dueToday: state.dueToday, auth: { ...state.auth.user } };
};

export default connect(mapStateToProps, {
  fetchDueToday,
  deleteTask,
  deleteAllDueTodayTasks,
  sortDueTodayTasksByName,
  sortDueTodayTasksByDate,
  sortDueTodayTasksByPriority,
})(DueToday);
