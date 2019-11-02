import "./Projects.css";

import React from "react";
import { connect } from "react-redux";
import { fetchProjects, createProject } from "../../actions";
import { Link } from "react-router-dom";

import ProjectItem from "../ProjectItem/ProjectItem.js";
import Modal from "../Modal/Modal";
import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";

import { dismissModalHandler } from "../../helpers";

class Projects extends React.Component {
  state = {
    modalsOpened: {
      anyModalOpened: false,
      createModalOpened: false
    }
  };

  componentDidMount() {
    this.props.fetchProjects();
  }

  componentDidUpdate() {}

  onModalOpen = event => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.classList.contains("create-button")) {
      if (!this.state.modalsOpened.createModalOpened) {
        this.setState({
          modalsOpened: { modalOpened: true, createModalOpened: true }
        });
      }
    }
  };

  renderProjects = () => {
    if (this.props.projects) {
      return this.props.projects.map((project, index) => {
        return (
          <Link
            to={`/projects/${project.id}`}
            key={project.id}
            className="project item list-header"
          >
            <ProjectItem project={project} />
          </Link>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  };

  renderCreateContent = () => {
    return (
      <React.Fragment>
        <ModalCloseButton
          onClose={() => {
            dismissModalHandler(this.state.modalsOpened, this.setState);
          }}
        />
        <h1 className="modal-header">Create New Project</h1>
        <form id="create-project-form">
          <div id="create-project-field-div">
            <input
              id="create-project-title-field"
              className="create-project-modal required text-field"
              type="text"
              name="project-title"
              placeholder="Project Title"
              maxLength="30"
              required="true"
              value=""
            />
          </div>

          <div
            className="two-buttons-container"
            id="create-project-buttons-container"
          >
            <ModalCancelButton
              onClose={() => {
                dismissModalHandler(this.state.modalsOpened, this.setState);
              }}
            />

            <input
              type="submit"
              className="form-submit"
              id="create-project-submit"
              value="Submit"
            />
          </div>
        </form>
      </React.Fragment>
    );
  };

  renderModal = () => {
    if (this.state.modalsOpened.createModalOpened) {
      return (
        <Modal
          sectionId="create-project-content"
          content={this.renderCreateContent()}
          onDismiss={() => {
            dismissModalHandler(this.state.modalsOpened, this.setState);
          }}
        />
      );
    }
    return null;
  };

  render() {
    console.log(this.props.projects);
    return (
      <React.Fragment>
        <div data-test="component-projects" className="projects-container">
          <div id="projects-list" className="todolist ui segment">
            <div className="ui relaxed divided list">
              <div className="project item list-header">
                <div className="project content">
                  <div className="header header-text project">My Projects</div>
                </div>
                <div>
                  <button className="create-button" onClick={this.onModalOpen}>
                    +
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
  return { projects: Object.values(state.projects) };
};
export default connect(
  mapStateToProps,
  {
    fetchProjects,
    createProject
  }
)(Projects);
