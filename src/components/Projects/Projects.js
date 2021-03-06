import "./Projects.css";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  fetchProjects,
  createProject,
  deleteAllProjects,
  sortProjectsByName,
  sortProjectsByTasks,
} from "../../actions";
import { Link } from "react-router-dom";

import ListLoader from "../ListLoader/ListLoader";
import ProjectItem from "../ProjectItem/ProjectItem.js";
import Settings from "../Settings/Settings";
import Modal from "../Modal/Modal";
import DeleteAll from "../forms/commonModals/DeleteAll";
import CreateProject from "../forms/projects/CreateProject";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.createButtonRef = React.createRef();
    // callback ref initial state
    this.ellipsisButtonRef = null;

    this.state = {
      modalsOpened: {
        any: false,
        create: false,
        deleteAll: false,
        settings: false,
      },
      backdropClass: null,
      settingsBackdropClass: null,
      settingsEllipsisClass: null,
      showLoader: true,
    };
  }

  componentDidMount() {
    (async () => {
      await this.props.fetchProjects(this.props.auth.userId);
      this.setState({ showLoader: false });
    })();
  }

  componentDidUpdate() {}

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

  //
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
        console.log(this.state);
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
    this.props.deleteAllProjects(this.props.auth.userId);
  };

  onModalOpen = (event, modalType) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      modalsOpened: { any: true, [modalType]: true },
    });
  };

  renderProjects = () => {
    const projects = this.props.projects;

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
          There are no projects found.
        </div>
      );
    }

    if (Object.keys(projects).length >= 1) {
      return projects.map((project) => (
        <Link
          to={`/projects/${project.id}`}
          key={project.id}
          className="project item list-header"
        >
          <ProjectItem
            project={project}
            id={project.id}
            closeSettings={() => this.handleSettingsClose()}
          />
        </Link>
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
          There are no projects found.
        </div>
      );
    }
  };

  renderModal = () => {
    if (this.state.modalsOpened.create) {
      return (
        <Modal
          sectionId="create-project-content"
          backdropClass={this.state.backdropClass}
          content={() => (
            <CreateProject
              onClose={() => {
                console.log("dismissed");
                this.dismissModalHandler();
                this.focusCreateButton();
              }}
            />
          )}
          onDismiss={() => {
            this.dismissModalHandler();
            this.focusCreateButton();
          }}
        />
      );
    } else if (this.state.modalsOpened.deleteAll) {
      return (
        <Modal
          sectionId="delete-all-project-content"
          backdropClass={this.state.backdropClass}
          content={() => (
            <DeleteAll
              itemName="projects"
              dataObject={this.props.projects}
              onClose={() => {
                this.dismissModalHandler();
                this.handleSettingsClose();
                setTimeout(() => this.focusEllipsisButton(), 200);
              }}
              deleteFunction={async () => {
                await this.handleDeleteAll();
                this.dismissModalHandler();
                this.handleSettingsClose();
                setTimeout(() => this.focusEllipsisButton(), 200);
              }}
            />
          )}
          onDismiss={() => {
            this.dismissModalHandler();
            this.handleSettingsClose();
            setTimeout(() => this.focusEllipsisButton(), 200);
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
    console.log(this.props.projects);
    return (
      <React.Fragment>
        <div
          data-test="component-projects"
          className="projects-container"
          onClick={() => {
            this.handleSettingsClose();
          }}
        >
          <div id="projects-list" className="todolist ui segment">
            <div className="ui relaxed divided list">
              <ListLoader showLoader={this.state.showLoader} />
              <div className="project item list-header first">
                <div className="project content">
                  <div className="header header-text project">My Projects</div>
                </div>
                <div
                  style={{
                    width: "9rem",
                  }}
                >
                  <button
                    className="create-button"
                    ref={this.createButtonRef}
                    onClick={(e) => {
                      this.onModalOpen(e, "create");
                      this.handleSettingsClose();
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
                    // class names linked to state
                    backdropClass={this.state.settingsBackdropClass}
                    ellipsisClass={this.state.settingsEllipsisClass}
                    settingItems={[
                      {
                        text: "Sort ascending (name)",
                        method: () => {
                          this.props.sortProjectsByName(
                            this.props.auth.userId,
                            this.props.projects
                          );
                        },
                      },
                      {
                        text: "Sort ascending (tasks)",
                        method: () => {
                          this.props.sortProjectsByTasks(
                            this.props.auth.userId,
                            this.props.projects,
                            "ascending"
                          );
                        },
                      },
                      {
                        text: "Sort descending (name)",
                        method: () => {
                          this.props.sortProjectsByName(
                            this.props.auth.userId,
                            this.props.projects,
                            "descending"
                          );
                        },
                      },
                      {
                        text: "Sort descending (tasks)",
                        method: () => {
                          this.props.sortProjectsByTasks(
                            this.props.auth.userId,
                            this.props.projects,
                            "descending"
                          );
                        },
                      },
                      {
                        text: "Delete all projects",
                        method: (e) => {
                          this.handleSettingsClose();
                          this.onModalOpen(e, "deleteAll");
                        },
                      },
                    ]}
                  />
                </div>
              </div>
              {this.renderProjects()}
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
    projects: state.projects,
    auth: { ...state.auth.user },
  };
};
export default connect(mapStateToProps, {
  fetchProjects,
  createProject,
  deleteAllProjects,
  sortProjectsByName,
  sortProjectsByTasks,
})(Projects);
