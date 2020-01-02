import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TaskItem from "../TaskItem/TaskItem.js";
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
  sortFinishedTasksByPriority
} from "../../actions";
import { ellipsifyString } from "../../helpers/index.js";

class FinishedTasks extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      details: false,
      deleteAll: false,
      settings: false
    },
    selectedTask: null,
    backdropClass: null,
    settingsBackdropClass: null,
    settingsEllipsisClass: null
  };

  componentDidMount() {
    // This should call fetch due today
    this.props.fetchFinishedTasks();
  }

  componentDidUpdate() {}

  handleSettingsClose = () => {
    if (this.state.modalsOpened.settings) {
      this.setState({
        settingsBackdropClass: "closed",
        settingsEllipsisClass: null
      });
      setTimeout(() => {
        this.setState({
          modalsOpened: { ...this.state.modalsOpened, settings: false },
          settingsBackdropClass: null
        });
      }, 200);
    }
  };

  handleSettingsOpen = () => {
    if (!this.state.modalsOpened.settings) {
      this.setState({
        modalsOpened: { settings: true },
        settingsEllipsisClass: "selected"
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
      modalsOpened: { any: true, [modalType]: true }
    });
  };

  renderTasks = () => {
    const tasks = this.props.finishedTasks;
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
          />
        </div>
      ));
    } else {
      return (
        <div style={{ color: "white", textAlign: "center" }}>
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
              }}
              deleteFunction={async () => {
                const tasks = this.props.finishedTasks;
                const deleteAllFinishedTasks = async () => {
                  for (let task of tasks) {
                    await this.props.deleteTask(task.projectId, task.id);
                    // this.props.deleteFinishedTask(task.id);
                  }
                };
                await deleteAllFinishedTasks();
                await this.props.deleteAllFinishedTasks();
                this.dismissModalHandler();
              }}
            />
          )}
          onDismiss={() => this.dismissModalHandler()}
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
        backdropClass: null
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
              <div className="task item list-header first">
                <div className="task content">
                  <div className="header header-text task">FINISHED TASKS</div>
                </div>
                <div style={{ width: "6rem", height: "3.1rem" }}>
                  <Settings
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
                            this.props.finishedTasks
                          );
                        }
                      },

                      {
                        text: "Sort ascending (date)",
                        method: () => {
                          this.props.sortFinishedTasksByDate(
                            this.props.finishedTasks
                          );
                        }
                      },
                      {
                        text: "Sort ascending (priority)",
                        method: () => {
                          this.props.sortFinishedTasksByPriority(
                            this.props.finishedTasks
                          );
                        }
                      },
                      {
                        text: "Sort descending (name)",
                        method: () => {
                          this.props.sortFinishedTasksByName(
                            this.props.finishedTasks,
                            "descending"
                          );
                        }
                      },
                      {
                        text: "Sort descending (date)",
                        method: () => {
                          this.props.sortFinishedTasksByDate(
                            this.props.finishedTasks,
                            "descending"
                          );
                        }
                      },
                      {
                        text: "Sort descending (priority)",
                        method: () => {
                          this.props.sortFinishedTasksByPriority(
                            this.props.finishedTasks,
                            "descending"
                          );
                        }
                      },

                      {
                        text: "Delete all tasks",
                        method: e => {
                          this.onModalOpen(e, "deleteAll");
                          this.handleSettingsClose();
                        }
                      }
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

const mapStateToProps = state => {
  return { finishedTasks: state.finishedTasks };
};

export default connect(
  mapStateToProps,
  {
    fetchFinishedTasks,
    deleteTask,
    deleteFinishedTask,
    deleteAllFinishedTasks,
    sortFinishedTasksByName,
    sortFinishedTasksByDate,
    sortFinishedTasksByPriority
  }
)(FinishedTasks);
