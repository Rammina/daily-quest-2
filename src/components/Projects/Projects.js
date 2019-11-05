import "./Projects.css";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchProjects, createProject } from "../../actions";
import { Link } from "react-router-dom";

import ProjectItem from "../ProjectItem/ProjectItem.js";
import Modal from "../Modal/Modal";
import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";

import CreateProject from "../forms/CreateProject";

class Projects extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      create: false
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
      if (!this.state.modalsOpened.create) {
        this.setState({
          modalsOpened: { any: true, create: true }
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
            <ProjectItem project={project} id={project.id} />
          </Link>
        );
      });
    } else {
      return <div>Loading...</div>;
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
              id={this.props.projects.length}
            />
          )}
          onDismiss={() => {
            this.dismissModalHandler();
          }}
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
  console.log(state.projects);
  return { projects: Object.values(state.projects) };
};
export default connect(
  mapStateToProps,
  {
    fetchProjects,
    createProject
  }
)(Projects);
