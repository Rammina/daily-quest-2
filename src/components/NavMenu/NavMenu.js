import "./NavMenu.css";

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NavContext } from "../AppContext";
import { authSignOut } from "../../actions";
import { Auth } from "aws-amplify";
import history from "../../history";

import GoogleAuth from "../GoogleAuth/GoogleAuth";

class NavMenu extends React.Component {
  static contextType = NavContext;

  componentDidMount() {}

  projectsLinkClass = () => {
    const { pathname } = this.props.location;
    // if (window.location.pathname.includes("projects")) {
    if (pathname.includes("projects")) {
      return "selected";
    }
    return null;
  };

  dueTodayLinkClass = () => {
    const { pathname } = this.props.location;
    if (pathname.includes("due-today")) {
      return "selected";
    }
    return null;
  };

  finishedTasksLinkClass = () => {
    const { pathname } = this.props.location;
    if (pathname.includes("finished-tasks")) {
      return "selected";
    }
    return null;
  };

  handleLogout = async () => {
    await Auth.signOut();
    await this.props.authSignOut();
    history.push("/login-page");
  };

  renderLogoutButton = () => {
    if (this.props.auth.authMethod === "googleAuth") {
      return (
        <GoogleAuth
          buttonClass="nav-menu"
          setLastNavMenuItemRef={this.context.setLastNavMenuItemRef}
          navMenuCloseButtonRef={this.context.navMenuCloseButtonRef}
        />
      );
    } else if (this.props.auth.authMethod === "cognito") {
      return (
        <button
          id="nav-menu-logout-button"
          onClick={this.handleLogout}
          className={`left item nav-item`}
        >
          Logout
        </button>
      );
    }
    return null;
  };

  render() {
    return !this.props.auth.isSignedIn ? null : (
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
          {this.renderLogoutButton()}
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { authSignOut })(withRouter(NavMenu));
