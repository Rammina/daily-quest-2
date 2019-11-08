import "./NavMenu.css";

import React from "react";
import { Link } from "react-router-dom";

class NavMenu extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
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
            className="left item no-border nav-item"
          >
            Projects
          </Link>
          <Link
            data-test="due-today-link"
            to="/due-today"
            className="left item nav-item"
          >
            Due Today
          </Link>
          <Link
            data-test="finished-tasks-link"
            to="/finished-tasks"
            className="left item nav-item"
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

export default NavMenu;
