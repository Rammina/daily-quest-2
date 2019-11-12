import "./Projects.css";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchProjects, createProject } from "../../actions";
import { Link } from "react-router-dom";

import ProjectItem from "../ProjectItem/ProjectItem.js";
import Modal from "../Modal/Modal";

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

  onModalOpen = (event, hi) => {
    console.log(hi);
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
    const projects = this.props.projects;
    if (projects) {
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
              onClose={(backdrop, delay) => {
                console.log("dismissed");
                this.dismissModalHandler(backdrop, delay);
              }}
            />
          )}
          onDismiss={(backdrop, delay) => {
            this.dismissModalHandler(backdrop, delay);
          }}
        />
      );
    }
    return null;
  };

  dismissModalHandler = (backdrop, delay) => {
    backdrop.classList.add("closed");
    setTimeout(() => {
      const modalsOpened = _.mapValues(this.state.modalsOpened, () => false);
      this.setState({
        modalsOpened
      });
    }, delay);
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
                <div>
                  <button
                    className="create-button"
                    onClick={e => this.onModalOpen(e, "hi")}
                  >
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
  return { projects: state.projects };
};
export default connect(
  mapStateToProps,
  {
    fetchProjects,
    createProject
  }
)(Projects);
