import "./NavMenu.css";

import React from "react";
import { Link, withRouter } from "react-router-dom";

class NavMenu extends React.Component {
  state = {};

  componentDidMount() {}

  projectsLinkClass = () => {
    if (window.location.pathname.includes("projects")) {
      return "selected";
    }
    return null;
  };

  dueTodayLinkClass = () => {
    if (window.location.pathname.includes("due-today")) {
      return "selected";
    }
    return null;
  };

  finishedTasksLinkClass = () => {
    if (window.location.pathname.includes("finished-tasks")) {
      return "selected";
    }
    return null;
  };

  render() {
    console.log(this.props.match.url);
    return (
      <React.Fragment>
        <div
          data-test="component-nav-menu"
          className={`nav-menu ${this.props.menuClass} ${this.props.sidebarClassFromClick}`}
        >
          <p style={{ visibility: "hidden" }}></p>
          <Link
            data-test="projects"
            to="/projects"
            className={`left item no-border nav-item ${this.projectsLinkClass()}`}
          >
            Projects
          </Link>
          <Link
            data-test="due-today-link"
            to="/due-today"
            className={`left item nav-item ${this.dueTodayLinkClass()}`}
          >
            Due Today
          </Link>
          <Link
            data-test="finished-tasks-link"
            to="/finished-tasks"
            className={`left item nav-item ${this.finishedTasksLinkClass()}`}
          >
            Finished Tasks
          </Link>
        </div>
        <div
          data-test="nav-menu-backdrop"
          id="nav-menu-backdrop"
          className={`${this.props.sidebarClassFromClick}`}
          onClick={this.props.onBackdropClick}
        ></div>
      </React.Fragment>
    );
  }
}

export default withRouter(NavMenu);
