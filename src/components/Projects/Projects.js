import "./Projects.css";
import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchProjects, createProject, deleteAllProjects } from "../../actions";
import { Link } from "react-router-dom";

import ProjectItem from "../ProjectItem/ProjectItem.js";
import Modal from "../Modal/Modal";
import DeleteAll from "../forms/commonModals/DeleteAll";

import CreateProject from "../forms/projects/CreateProject";

class Projects extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      create: false,
      deleteAll: false
    }
  };

  componentDidMount() {
    this.props.fetchProjects();
  }

  componentDidUpdate() {}

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
      const items = [];
      for (let projectKey in projects) {
        if (projects.hasOwnProperty(projectKey)) {
          items.push(
            <Link
              to={`/projects/${projectKey}`}
              key={projectKey}
              className="project item list-header"
            >
              <ProjectItem project={projects[projectKey]} id={projectKey} />
            </Link>
          );
        }
      }
      return items;
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
    const modalsOpened = _.mapValues(this.state.modalsOpened, () => false);
    this.setState({
      modalsOpened
    });
  };

  render() {
    console.log(this.props.projects);
    return (
      <React.Fragment>
        <div data-test="component-projects" className="projects-container">
          <div id="projects-list" className="todolist ui segment">
            <div className="ui relaxed divided list">
              <div className="project item list-header first">
                <div className="project content">
                  <div className="header header-text project">My Projects</div>
                </div>
                <div style={{ width: "9rem" }}>
                  <button
                    className="create-button"
                    onClick={e => this.onModalOpen(e, "create")}
                  >
                    +
                  </button>
                  <button
                    onClick={e => this.onModalOpen(e, "deleteAll")}
                    className="project delete-button icon-button black"
                  >
                    <img
                      className="icon-image black"
                      src={TrashImg}
                      alt="Trash Can"
                    />
                  </button>
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
    deleteAllProjects
  }
)(Projects);
