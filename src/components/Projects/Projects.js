import "./Projects.css";

import React from "react";
import {connect} from 'react-redux';
import {fetchProjects} from '../../actions';

class Projects extends React.Component {
	
  componentDidMount() {
  	this.props.fetchProjects();
  }

  renderProjects(){
  	return this.props.projects.map(project => {
  		return (
  			<div className="item list-header" key={`${project.name}-${project.id}`}>
              <div className="content">
                <div className="header">{project.name}</div>                
              </div>
            </div>
  		);
  	});
  }

  render() {
  	console.log(this.props.projects);
    return (
      <div data-test="component-projects" className="projects-container">
        <div className="todolist ui segment">
          <div className="ui relaxed divided list">
            <div className="item list-header">
              <div className="content">
                <div className="header">My Projects</div>                
              </div>
            </div>
            <div className="item">
              <div className="content">
                <div className="header">Sample Project</div>                
              </div>
            </div>
            <div className="item">
              <div className="content">
                <div className="header">Sample Project</div>                
              </div>
            </div>             
            {this.renderProjects()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
	return { projects: state.projects};
}
export default connect(mapStateToProps, {fetchProjects})(Projects);
