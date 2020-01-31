import "./NavMenu.css";

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { NavContext } from "../AppContext";

class NavMenu extends React.Component {
  static contextType = NavContext;

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
          <button
            onClick={() => {
              // note: this needs functionality
            }}
            className={"nav-close"}
          >
            x
          </button>
          <Link
            ref={this.context.setFirstNavMenuItem}
            data-test="projects"
            to="/projects"
            className={`left item no-border nav-item ${this.projectsLinkClass()}`}
            onKeyDown={e => {
              if (window.innerWidth < 900) {
                if (e.key === "Tab" && e.shiftKey) {
                  e.preventDefault();
                  e.stopPropagation();
                  // note: this will need a close button for the navigation menu
                  // put the element to focus here
                  // if (this.context.firstNavMenuItemRef) {
                  // this.context.firstNavMenuItemRef.focus();
                  // }
                }
              }
            }}
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
            ref={this.context.setLastNavMenuItem}
            data-test="finished-tasks-link"
            to="/finished-tasks"
            className={`left item nav-item ${this.finishedTasksLinkClass()}`}
            onKeyDown={e => {
              if (window.innerWidth < 900) {
                if (e.key === "Tab" && !e.shiftKey) {
                  e.preventDefault();
                  e.stopPropagation();
                  // put the element to focus here
                  if (this.context.firstNavMenuItemRef) {
                    this.context.firstNavMenuItemRef.focus();
                  }
                }
              }
            }}
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
