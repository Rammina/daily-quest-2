import "./Projects.css";

import React from "react";
import { connect } from "react-redux";
import { fetchProjects } from "../../actions";
import { Link } from "react-router-dom";

import ProjectItem from "../ProjectItem/ProjectItem.js";

class Projects extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  renderProjects() {
    if (this.props.projects) {
      return this.props.projects.map((project, index) => {
        return (
          <Link to={`/projects/${project.id}`}>
            <ProjectItem project={project} />
          </Link>
        );
      });
    } else {
      return null;
    }
  }

  render() {
    console.log(this.props.projects);
    return (
      <div data-test="component-projects" className="projects-container">
        <div id="projects-list" className="todolist ui segment">
          <div className="ui relaxed divided list">
            <div className="item list-header">
              <div className="content">
                <div className="header header-text project">My Projects</div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <div className="description-text project">Sample Project</div>
              </div>
            </div>
            <div className="item">
              <div className="content">
                <div className="description-text project">Sample Project</div>
              </div>
            </div>
            {this.renderProjects()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { projects: state.projects };
};
export default connect(
  mapStateToProps,
  { fetchProjects }
)(Projects);
