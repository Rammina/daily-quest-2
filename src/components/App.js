import "./App.css";

import React from "react";
import { connect } from "react-redux";
import { Router, Route, Redirect } from "react-router-dom";
import history from "../history";

import AppLoader from "./AppLoader/AppLoader";
import ErrorPage from "./ErrorPage/ErrorPage";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Projects from "./Projects/Projects";
import Tasks from "./Tasks/Tasks";
import FinishedTasks from "./FinishedTasks/FinishedTasks";
import DueToday from "./DueToday/DueToday";
import LoginPage from "./LoginPage/LoginPage";
import GoogleAuth from "./GoogleAuth/GoogleAuth";

import { ElementsContext, NavContext, GoogleAuthContext } from "./AppContext";

class App extends React.Component {
  state = {
    // modal
    modalCloseButtonRef: null,
    modalDeleteAllButtonRef: null,
    modalProjectsSubmitButtonRef: null,
    modalProjectsDeleteButtonRef: null,
    modalTasksSubmitButtonRef: null,
    modalTasksDeleteButtonRef: null,
    modalDetailsEditButtonRef: null,
    modalDetailsDeleteButtonRef: null,
    // non-modal
    firstSettingsItem: null,
    navMenuCloseButtonRef: null,
    lastNavMenuItemRef: null,
    // GoogleAuth
    googleSignInChecked: false,
    // loader
    showLoader: true,
    loaderFadeClass: null,
    // rerender Boolean
    rerenderBoolean: false
  };

  // function used to trigger render manually
  manualRender = () => {
    this.setState({ rerenderBoolean: !this.state.rerenderBoolean });
  };

  // functions used for retrieving context values
  getElementsContextValue = () => {
    return {
      // main body content
      //
      modalCloseButtonRef: this.state.modalCloseButtonRef,
      setModalCloseButtonRef: this.setModalCloseButtonRef,
      //PROJECTS
      modalProjectsSubmitButtonRef: this.state.modalProjectsSubmitButtonRef,
      setModalProjectsSubmitButtonRef: this.setModalProjectsSubmitButtonRef,
      //
      modalProjectsDeleteButtonRef: this.state.modalProjectsDeleteButtonRef,
      setModalProjectsDeleteButtonRef: this.setModalProjectsDeleteButtonRef,
      //TASKS
      modalTasksSubmitButtonRef: this.state.modalTasksSubmitButtonRef,
      setModalTasksSubmitButtonRef: this.setModalTasksSubmitButtonRef,
      //
      modalTasksDeleteButtonRef: this.state.modalTasksDeleteButtonRef,
      setModalTasksDeleteButtonRef: this.setModalTasksDeleteButtonRef,
      //
      modalDetailsEditButtonRef: this.state.modalDetailsEditButtonRef,
      setModalDetailsEditButtonRef: this.setModalDetailsEditButtonRef,
      //
      modalDetailsDeleteButtonRef: this.state.modalDetailsDeleteButtonRef,
      setModalDetailsDeleteButtonRef: this.setModalDetailsDeleteButtonRef,
      //
      modalDeleteAllButtonRef: this.state.modalDeleteAllButtonRef,
      setModalDeleteAllButtonRef: this.setModalDeleteAllButtonRef,
      // SETTINGS
      firstSettingsItem: this.state.firstSettingsItem,
      setFirstSettingsItem: this.setFirstSettingsItem
    };
  };

  getNavContextValue = () => {
    return {
      // NAV MENU
      navMenuCloseButtonRef: this.state.navMenuCloseButtonRef,
      setNavMenuCloseButtonRef: this.setNavMenuCloseButtonRef,
      //
      lastNavMenuItemRef: this.state.lastNavMenuItemRef,
      setLastNavMenuItemRef: this.setLastNavMenuItemRef
    };
  };

  getGoogleAuthContextValue = () => {
    return {
      signInChecked: this.state.googleSignInChecked,
      setSignInChecked: isChecked => {
        this.setGoogleSignInChecked(isChecked);
      },
      fadeLoaderAfterCheck: this.fadeLoaderAfterCheck,
      showLoaderBeforeCheck: this.showLoaderBeforeCheck
    };
  };

  // used to show the loader again
  showLoaderBeforeCheck = () => {
    this.setState({ loaderFadeClass: null, showLoader: true });
  };

  // this is used to hide the loader
  fadeLoaderAfterCheck = () => {
    setTimeout(() => {
      console.log("hello");

      if (this.state.googleSignInChecked) {
        this.setState({ loaderFadeClass: "no-display" });
        this.hideLoader(300);
      }
    }, 500);
  };

  hideLoader = delay => {
    if (delay) {
      setTimeout(() => {
        this.setState({ showLoader: false });
      }, delay);
    } else {
      this.setState({ showLoader: false });
    }
  };

  // GoogleAuth functions
  setGoogleSignInChecked = isChecked => {
    this.setState({ googleSignInChecked: isChecked });
  };

  renderGlobalGoogleAuth = () => {
    if (!(window.location.pathname === "login-page")) {
      // render the GoogleAuth component outside login page
      // to initialize Google log in status
      return (
        <div style={{ display: "none" }}>
          <GoogleAuth />
        </div>
      );
    }
    return null;
  };

  // callback ref functions
  setModalCloseButtonRef = ref => {
    this.setState({ modalCloseButtonRef: ref });
  };

  setModalDeleteAllButtonRef = ref => {
    this.setState({ modalDeleteAllButtonRef: ref });
  };

  // PROJECTS
  setModalProjectsSubmitButtonRef = ref => {
    this.setState({ modalProjectsSubmitButtonRef: ref });
    console.log(this.state.modalProjectsSubmitButtonRef);
  };

  setModalProjectsDeleteButtonRef = ref => {
    this.setState({ modalProjectsDeleteButtonRef: ref });
  };

  // TASKS
  setModalTasksSubmitButtonRef = ref => {
    this.setState({ modalTasksSubmitButtonRef: ref });
  };

  setModalTasksDeleteButtonRef = ref => {
    this.setState({ modalTasksDeleteButtonRef: ref });
  };
  // //task details
  setModalDetailsEditButtonRef = ref => {
    this.setState({ modalDetailsEditButtonRef: ref });
  };

  setModalDetailsDeleteButtonRef = ref => {
    this.setState({ modalDetailsDeleteButtonRef: ref });
  };

  // settings
  setFirstSettingsItem = ref => {
    this.setState({ firstSettingsItem: ref });
  };

  // navigation menu
  setNavMenuCloseButtonRef = ref => {
    this.setState({ navMenuCloseButtonRef: ref });
  };

  setLastNavMenuItemRef = ref => {
    this.setState({ lastNavMenuItemRef: ref });
  };

  render() {
    // ERROR 404
    if (
      !(
        window.location.pathname === "/" ||
        window.location.pathname === "/home" ||
        window.location.pathname === "/home/" ||
        window.location.pathname.includes("login-page") ||
        window.location.pathname.includes("projects") ||
        window.location.pathname.includes("finished-tasks") ||
        window.location.pathname.includes("due-today")
      )
    ) {
      // it should show an error 404 page
      // note: should probably refactor something because there is a bug with the browser 's\iz back button'
      return (
        <Router history={history}>
          <ErrorPage errorType="404" manualRender={this.manualRender} />
        </Router>
      );
    }

    // context value objects
    const elementsContextValue = this.getElementsContextValue();
    const navContextValue = this.getNavContextValue();
    const googleAuthContextValue = this.getGoogleAuthContextValue();

    // AppLoader prop values
    const appLoaderProps = {
      show: this.state.showLoader,
      fadeClass: this.state.loaderFadeClass
    };

    // check if logged in, show login page if not.
    if (!this.props.isSignedIn) {
      // replace this with a login page component
      return (
        <React.Fragment>
          <Router history={history}>
            <GoogleAuthContext.Provider value={googleAuthContextValue}>
              <AppLoader loader={appLoaderProps} />
              {this.renderGlobalGoogleAuth()}
              <Route path="/" exact>
                {this.props.isSignedIn ? (
                  <Redirect to="/home" />
                ) : (
                  <Redirect to="/login-page" />
                )}
              </Route>
              <Route path="/login-page" exact component={LoginPage} />
            </GoogleAuthContext.Provider>
          </Router>
        </React.Fragment>
      );
    }
    return (
      <div data-test="component-app" className="ui container">
        <Router history={history}>
          <Route path="/" exact>
            {this.props.isSignedIn ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/login-page" />
            )}
          </Route>
          <GoogleAuthContext.Provider value={googleAuthContextValue}>
            <AppLoader loader={appLoaderProps} />
            <div>
              <NavContext.Provider value={navContextValue}>
                <Header />
              </NavContext.Provider>
              <ElementsContext.Provider value={elementsContextValue}>
                <Route path="/home" exact component={Home} />
                <Route path="/projects" exact component={Projects} />
                <Route path="/projects/:id" exact component={Tasks} />
                <Route path="/due-today" exact component={DueToday} />
                <Route path="/finished-tasks" exact component={FinishedTasks} />
              </ElementsContext.Provider>
            </div>
          </GoogleAuthContext.Provider>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.googleAuth.isSignedIn };
};

export default connect(
  mapStateToProps,
  {}
)(App);
