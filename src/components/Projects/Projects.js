import "./Projects.css";

import React from "react";
import { connect } from "react-redux";
import { fetchProjects, createProject } from "../../actions";
import { Link } from "react-router-dom";

import ProjectItem from "../ProjectItem/ProjectItem.js";

class Projects extends React.Component {
	state = {
		modalOpened: false,
		createModalOpened: false,
	}

  componentDidMount() {
    this.props.fetchProjects();
  }

  componentDidUpdate(){

  }

  renderProjects() {
    if (this.props.projects) {
      return this.props.projects.map((project, index) => {
        return (
          <Link
            to={`/projects/${project.id}`}
            key={index}
            className="project item list-header"
          >
            <ProjectItem project={project} />
          </Link>
        );
      });
    } else {
      return null;
    }
  }

  onRenderModal = (event) =>{  	
  	event.preventDefault();
  	event.stopPropagation();

  }

  render() {
    console.log(this.props.projects);
    return (
      <div data-test="component-projects" className="projects-container">
        <div id="projects-list" className="todolist ui segment">
          <div className="ui relaxed divided list">
            <div className="project item list-header">
              <div className="project content">
                <div className="header header-text project">My Projects</div>
              </div>
              <div>
              	<button onClick={onRenderModal}>+</button>

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
  return { projects: Object.values(state.projects) };
};
export default connect(
  mapStateToProps,
  { 
  	fetchProjects,
  	createProject
  }
)(Projects);
