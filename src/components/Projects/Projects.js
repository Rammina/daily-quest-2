import "./Projects.css";

import React from "react";

class Projects extends React.Component {

	
  componentDidMount() {}

  render() {
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
          </div>
        </div>
      </div>
    );
  }
}

export default Projects;
