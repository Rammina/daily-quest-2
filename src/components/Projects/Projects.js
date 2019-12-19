import "./Projects.css";
import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import {
  fetchProjects,
  createProject,
  deleteAllProjects,
  sortProjectsByName,
  sortProjectsByTasks
} from "../../actions";
import { objectToArray } from "../../helpers";
import { Link } from "react-router-dom";

import ProjectItem from "../ProjectItem/ProjectItem.js";
import Settings from "../Settings/Settings";
import Modal from "../Modal/Modal";
import DeleteAll from "../forms/commonModals/DeleteAll";

import CreateProject from "../forms/projects/CreateProject";

class Projects extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      create: false,
      deleteAll: false,
      settings: false
    },
    backdropClass: null,
    settingsBackdropClass: null
  };

  componentDidMount() {
    this.props.fetchProjects();
  }

  componentDidUpdate() {}

  //
  handleSettingsClose = () => {
    if (this.state.modalsOpened.settings) {
      this.setState({ settingsBackdropClass: "closed" });
      setTimeout(() => {
        this.setState({
          modalsOpened: { settings: false },
          settingsBackdropClass: null
        });
      }, 200);
    }
  };

  handleSettingsOpen = () => {
    if (!this.state.modalsOpened.settings) {
      this.setState({ modalsOpened: { settings: true } });
    }
  };

  // No need to pass a key because all projects will be deleted
  // If this was a specific project, then it requires the key
  handleDeleteAll = () => {
    this.props.deleteAllProjects();
  };

  onModalOpen = (event, modalType) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      modalsOpened: { any: true, [modalType]: true }
    });
  };

  renderProjects = () => {
    const projects = this.props.projects;
    if (Object.keys(projects).length >= 1) {
      return projects.map(project => (
        <Link
          to={`/projects/${project.id}`}
          key={project.id}
          className="project item list-header"
        >
          <ProjectItem project={project} id={project.id} />
        </Link>
      ));
    } else {
      return (
        <div style={{ color: "white", textAlign: "center" }}>
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
              }}
            />
          )}
          onDismiss={() => {
            this.dismissModalHandler();
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
              }}
              deleteFunction={async () => {
                await this.props.deleteAllProjects();
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
              <div className="project item list-header first">
                <div className="project content">
                  <div className="header header-text project">My Projects</div>
                </div>
                <div
                  style={{
                    width: "9rem"
                  }} /*className="action-button-container"*/
                >
                  <button
                    className="create-button"
                    onClick={e => this.onModalOpen(e, "create")}
                  >
                    +
                  </button>
                  <Settings
                    isModalOpen={this.state.modalsOpened.settings}
                    openModal={this.handleSettingsOpen}
                    closeModal={this.handleSettingsClose}
                    backdropClass={this.state.settingsBackdropClass}
                    settingItems={[
                      {
                        text: "Sort ascending (name)",
                        method: () => {
                          this.props.sortProjectsByName(this.props.projects);
                        }
                      },
                      {
                        text: "Sort ascending (tasks)",
                        method: () => {
                          this.props.sortProjectsByTasks(
                            this.props.projects,
                            "ascending"
                          );
                        }
                      },
                      {
                        text: "Sort descending (name)",
                        method: () => {
                          this.props.sortProjectsByName(
                            this.props.projects,
                            "descending"
                          );
                        }
                      },
                      {
                        text: "Sort descending (tasks)",
                        method: () => {
                          this.props.sortProjectsByTasks(
                            this.props.projects,
                            "descending"
                          );
                        }
                      },
                      {
                        text: "Delete all projects",
                        method: e => this.onModalOpen(e, "deleteAll")
                      }
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

const mapStateToProps = state => {
  return { projects: state.projects };
};
export default connect(
  mapStateToProps,
  {
    fetchProjects,
    createProject,
    deleteAllProjects,
    sortProjectsByName,
    sortProjectsByTasks
  }
)(Projects);
