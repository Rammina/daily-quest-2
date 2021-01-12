import "./Tasks.css";
import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  fetchProject,
  createTask,
  deleteAllTasks,
  sortTasksByName,
  sortTasksByDate,
  sortTasksByPriority,
} from "../../actions";
import { Link, withRouter } from "react-router-dom";

import AppLoader from "../AppLoader/AppLoader";
import ErrorPage from "../ErrorPage/ErrorPage";
import TaskItem from "../TaskItem/TaskItem.js";
import ListLoader from "../ListLoader/ListLoader";
import DeleteAll from "../forms/commonModals/DeleteAll";
import Modal from "../Modal/Modal";
import Settings from "../Settings/Settings";
import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";
import { ellipsifyString } from "../../helpers";

import CreateTask from "../forms/tasks/CreateTask";

class Tasks extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      create: false,
      deleteAll: false,
    },
    selectedTask: null,
    backdropClass: null,
    settingsBackdropClass: null,
    settingsEllipsisClass: null,
    showLoader: true,
  };

  componentDidMount() {
    console.log(this.props);
    (async () => {
      await this.props.fetchProject(
        this.props.auth.userId,
        this.props.match.params.id
      );

      this.setState({ showLoader: false });
    })();
  }

  componentDidUpdate() {}

  // refs
  createButtonRef = React.createRef();

  // // using the callback version here because it's much more customizable
  setEllipsisRef = (ref) => {
    this.ellipsisButtonRef = ref;
  };

  // focus methods
  focusCreateButton = () => {
    // non-callback focus of ref
    this.createButtonRef.current.focus();
  };

  focusEllipsisButton = () => {
    if (this.ellipsisButtonRef) {
      //guard
      // callback focus of ref
      this.ellipsisButtonRef.focus();
    }
  };

  hideLoader = (delay) => {
    this.setState({ loaderFadeClass: "no-display" });
    if (delay) {
      setTimeout(() => {
        this.setState({ showLoader: false });
      }, delay);
    } else {
      this.setState({ showLoader: false });
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
  // This requires some editing for the task data structures
  handleDeleteAll = () => {
    // this.props.deleteAllProjects();
  };
  onModalOpen = (e, modalType) => {
    if (!this.state.modalsOpened.any) {
      this.setState({
        modalsOpened: { any: true, [modalType]: true },
      });
    }
  };

  renderProjectName = () => {
    if (this.state.showLoader) {
      return null;
    }
    return this.props.project.name
      ? ellipsifyString(this.props.project.name, 20)
      : null;
  };

  renderTasks = () => {
    const projectId = this.props.project.id;
    const tasks = this.props.project.tasks;
    console.log("tasks is");
    console.log(tasks);

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
          There are no tasks found.
        </div>
      );
    }

    if (tasks && Object.keys(tasks).length !== 0) {
      return tasks.map((task) => (
        <div
          key={task.id}
          className={`task item list-header task-item-details`}
        >
          <TaskItem
            hideProjectName={true}
            task={task}
            taskId={task.id}
            projectId={this.props.match.params.id}
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
    console.log(this.state.modalsOpened);

    if (this.state.modalsOpened.create) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="create-task-content"
          content={() => {
            return (
              <CreateTask
                onClose={() => {
                  this.dismissModalHandler();
                  setTimeout(() => {
                    this.focusCreateButton();
                  }, 200);
                }}
                id={this.props.match.params.id}
              />
            );
          }}
          onDismiss={() => {
            this.dismissModalHandler();
            setTimeout(() => {
              this.focusCreateButton();
            }, 200);
          }}
        />
      );
    } else if (this.state.modalsOpened.deleteAll) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="delete-all-task-content"
          content={() => (
            <DeleteAll
              itemName="tasks"
              dataObject={this.props.project}
              onClose={() => {
                this.dismissModalHandler();
                setTimeout(() => {
                  this.focusEllipsisButton();
                }, 200);
                // this.handleSettingsClose();
              }}
              deleteFunction={async () => {
                await this.props.deleteAllTasks(
                  this.props.auth.userId,
                  this.props.project.id
                );
                this.dismissModalHandler();
                setTimeout(() => {
                  this.focusEllipsisButton();
                }, 200);
                // this.handleSettingsClose();
              }}
            />
          )}
          onDismiss={() => {
            this.dismissModalHandler();
            setTimeout(() => {
              this.focusEllipsisButton();
            }, 200);
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
    // render something else while this is loading
    if (this.state.showLoader) {
      //note: replace this placeholder, and show a loader
      return <div className="tasks-container"></div>;
    }
    // if this project doesn't exist show an error 404 page
    if (_.isEmpty(this.props.project)) {
      return <ErrorPage errorType="404" />;
    }

    console.log(this.props.project);
    console.log(this.props.match.params.id);
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
            <div className={`ui relaxed divided list`}>
              <ListLoader showLoader={this.state.showLoader} />
              <div className="task item list-header first">
                <div className="task content">
                  <div className="header header-text task">
                    {this.renderProjectName()}
                  </div>
                </div>
                <div style={{ width: "9rem" }}>
                  <button
                    ref={this.createButtonRef}
                    className="create-button"
                    onClick={(e) => {
                      this.onModalOpen(e, "create");
                    }}
                  >
                    +
                  </button>
                  <Settings
                    // focus functions
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
                          this.props.sortTasksByName(
                            this.props.auth.userId,
                            this.props.project.tasks,
                            this.props.project.id
                          );
                        },
                      },
                      {
                        text: "Sort ascending (date)",
                        method: () => {
                          this.props.sortTasksByDate(
                            this.props.auth.userId,
                            this.props.project.tasks,
                            this.props.project.id
                          );
                        },
                      },
                      {
                        text: "Sort ascending (priority)",
                        method: () => {
                          this.props.sortTasksByPriority(
                            this.props.auth.userId,
                            this.props.project.tasks,
                            this.props.project.id
                          );
                        },
                      },
                      {
                        text: "Sort descending (name)",
                        method: () => {
                          this.props.sortTasksByName(
                            this.props.auth.userId,
                            this.props.project.tasks,
                            this.props.project.id,
                            "descending"
                          );
                        },
                      },
                      {
                        text: "Sort descending (date)",
                        method: () => {
                          this.props.sortTasksByDate(
                            this.props.auth.userId,
                            this.props.project.tasks,
                            this.props.project.id,
                            "descending"
                          );
                        },
                      },

                      {
                        text: "Sort descending (priority)",
                        method: () => {
                          this.props.sortTasksByPriority(
                            this.props.auth.userId,
                            this.props.project.tasks,
                            this.props.project.id,
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
                  {
                    // <button
                    // onClick={e => this.onModalOpen(e, "deleteAll")}
                    // className="task delete-button icon-button black"
                    // >
                    // <img
                    // className="icon-image black"
                    // src={TrashImg}
                    // alt="Trash Can"
                    // />
                    // </button>
                  }
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
  console.log(state.selectedProject);
  return {
    project: state.selectedProject,
    auth: { ...state.auth.user },
  };
};

export default connect(mapStateToProps, {
  fetchProject,
  deleteAllTasks,
  sortTasksByName,
  sortTasksByDate,
  sortTasksByPriority,
})(withRouter(Tasks));
