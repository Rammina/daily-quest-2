import "./NavMenu.css";

import React from "react";
import { Link } from "react-router-dom";
import { NavContext } from "../AppContext";

import GoogleAuth from "../GoogleAuth/GoogleAuth";

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
    return (
      <React.Fragment>
        <div
          data-test="component-nav-menu"
          className={`nav-menu ${this.props.menuClass} ${this.props.sidebarClassFromClick}`}
        >
          <p style={{ visibility: "hidden" }}></p>
          <button
            ref={this.context.setNavMenuCloseButtonRef}
            className={"nav-close"}
            onClick={() => {
              this.props.onBackdropClick();
              this.props.focusHamburger();
            }}
            onKeyDown={(e) => {
              if (window.innerWidth < 900) {
                if (e.key === "Tab" && e.shiftKey) {
                  e.preventDefault();
                  e.stopPropagation();
                  // put the element to focus here
                  if (this.context.lastNavMenuItemRef) {
                    this.context.lastNavMenuItemRef.focus();
                  }
                }
              }
            }}
          >
            x
          </button>
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
          {/*
          <GoogleAuth
            buttonClass="nav-menu"
            setLastNavMenuItemRef={this.context.setLastNavMenuItemRef}
            navMenuCloseButtonRef={this.context.navMenuCloseButtonRef}
          />
          */}
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
