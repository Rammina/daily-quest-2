import "./App.css";

import React from "react";
import { connect } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { Auth } from "aws-amplify";
import history from "../history";
import { authSignIn, authSignOut } from "../actions";
// components
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import AppLoader from "./AppLoader/AppLoader";
import ErrorPage from "./ErrorPage/ErrorPage";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Projects from "./Projects/Projects";
import Tasks from "./Tasks/Tasks";
import FinishedTasks from "./FinishedTasks/FinishedTasks";
import DueToday from "./DueToday/DueToday";
import LoginPage from "./LoginPage/LoginPage";
import Register from "./Register/Register";
import GoogleAuth from "./GoogleAuth/GoogleAuth";

import {
  ElementsContext,
  NavContext,
  AuthContext,
  // CognitoAuthContext,
} from "./AppContext";

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
    // AWS amplify/auth + GoogleAuth
    isAuthenticated: false,
    authSignInChecked: false,
    // session authentication (storage)
    isAuthenticating: true,
    // loader
    showLoader: true,
    loaderFadeClass: null,
    // rerender Boolean
    rerenderBoolean: false,
  };
  componentDidMount() {
    this.onLoadAuthSetup();
  }

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
      setFirstSettingsItem: this.setFirstSettingsItem,
    };
  };

  getNavContextValue = () => {
    return {
      // NAV MENU
      navMenuCloseButtonRef: this.state.navMenuCloseButtonRef,
      setNavMenuCloseButtonRef: this.setNavMenuCloseButtonRef,
      //
      lastNavMenuItemRef: this.state.lastNavMenuItemRef,
      setLastNavMenuItemRef: this.setLastNavMenuItemRef,
    };
  };

  getAuthContextValue = () => {
    return {
      signInChecked: this.state.authSignInChecked,
      setSignInChecked: (isChecked) => {
        this.setAuthSignInChecked(isChecked);
      },
    };
  };

  getAuthContextValue = () => {
    return {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: (isAuthenticated) => {
        this.setState({ isAuthenticated: isAuthenticated });
      },
      authsignInChecked: this.state.authSignInChecked,
      setAuthSignInChecked: (isChecked) => {
        this.setAuthSignInChecked(isChecked);
      },
      fadeLoaderAfterCheck: this.fadeLoaderAfterCheck,
      showLoaderBeforeCheck: this.showLoaderBeforeCheck,
    };
  };

  onLoadAuthSetup = async () => {
    try {
      console.log("authentication setup...");
      // const sessionData = await Auth.currentSession();
      // console.log(sessionData);
      // const user = await Auth.
      const { attributes } = await Auth.currentAuthenticatedUser();
      const userId = attributes.sub;
      console.log(attributes);
      console.log(attributes.sub);
      // this.props.userHasAuthenticated(true);
      this.props.authSignIn({ userId, authMethod: "cognito" });
    } catch (e) {
      if (e !== "No current user") {
        console.log(e);
      }
    }

    this.setState({ isAuthenticating: false });
  };

  // used to show the loader again
  showLoaderBeforeCheck = () => {
    this.setState({ loaderFadeClass: null, showLoader: true });
  };

  // this is used to hide the loader
  fadeLoaderAfterCheck = () => {
    setTimeout(() => {
      console.log("hello");

      if (this.state.authSignInChecked) {
        this.hideLoader(300);
      }
    }, 500);
  };

  hideLoader = (delay) => {
    this.setState({ loaderFadeClass: "no-display" });
    if (delay) {
      setTimeout(() => {
        this.setState({ showLoader: false });
      }, delay);
    } else {
      this.setState({ showLoader: false });
    }
  };

  //Auth functions
  setAuthSignInChecked = (isChecked) => {
    this.setState({ authSignInChecked: isChecked });
  };

  renderGlobalGoogleAuth = () => {
    if (!(window.location.pathname === "login-page")) {
      // render the GoogleAuth component outside login page
      // to initialize Google log in status
      return (
        <div style={{ display: "none" }}>
          {" "}
          <GoogleAuth />
        </div>
      );
    }
    return null;
  };

  // callback ref functions
  setModalCloseButtonRef = (ref) => {
    this.setState({ modalCloseButtonRef: ref });
  };

  setModalDeleteAllButtonRef = (ref) => {
    this.setState({ modalDeleteAllButtonRef: ref });
  };

  // PROJECTS
  setModalProjectsSubmitButtonRef = (ref) => {
    this.setState({ modalProjectsSubmitButtonRef: ref });
    console.log(this.state.modalProjectsSubmitButtonRef);
  };

  setModalProjectsDeleteButtonRef = (ref) => {
    this.setState({ modalProjectsDeleteButtonRef: ref });
  };

  // TASKS
  setModalTasksSubmitButtonRef = (ref) => {
    this.setState({ modalTasksSubmitButtonRef: ref });
  };

  setModalTasksDeleteButtonRef = (ref) => {
    this.setState({ modalTasksDeleteButtonRef: ref });
  };
  // //task details
  setModalDetailsEditButtonRef = (ref) => {
    this.setState({ modalDetailsEditButtonRef: ref });
  };

  setModalDetailsDeleteButtonRef = (ref) => {
    this.setState({ modalDetailsDeleteButtonRef: ref });
  };

  // settings
  setFirstSettingsItem = (ref) => {
    this.setState({ firstSettingsItem: ref });
  };

  // navigation menu
  setNavMenuCloseButtonRef = (ref) => {
    this.setState({ navMenuCloseButtonRef: ref });
  };

  setLastNavMenuItemRef = (ref) => {
    this.setState({ lastNavMenuItemRef: ref });
  };

  render() {
    // context value objects
    const elementsContextValue = this.getElementsContextValue();
    const navContextValue = this.getNavContextValue();
    const authContextValue = this.getAuthContextValue();
    // const cognitoAuthContextValue = this.getCognitoAuthContextValue();

    // AppLoader prop values
    const appLoaderProps = {
      show: this.state.showLoader,
      fadeClass: this.state.loaderFadeClass,
    };

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

          <AuthContext.Provider value={authContextValue}>
            <AppLoader loader={appLoaderProps} />
            {this.renderGlobalGoogleAuth()}
            <div>
              {/*only show the navigation bar if the user is signed in*/}
              {this.props.isSignedIn ? (
                <NavContext.Provider value={navContextValue}>
                  <Header />
                </NavContext.Provider>
              ) : null}

              <ElementsContext.Provider value={elementsContextValue}>
                <Switch>
                  <UnauthenticatedRoute path="/login-page" exact>
                    <LoginPage />
                  </UnauthenticatedRoute>
                  <UnauthenticatedRoute path="/register" exact>
                    <Register />
                  </UnauthenticatedRoute>
                  <AuthenticatedRoute exact path="/home">
                    <Home />
                  </AuthenticatedRoute>
                  <AuthenticatedRoute exact path="/projects">
                    <Projects />
                  </AuthenticatedRoute>
                  <AuthenticatedRoute exact path="/projects/:id">
                    <Tasks />
                  </AuthenticatedRoute>
                  <AuthenticatedRoute exact path="/due-today">
                    <DueToday />
                  </AuthenticatedRoute>
                  <AuthenticatedRoute exact path="/finished-tasks">
                    <FinishedTasks />
                  </AuthenticatedRoute>
                  <Route>
                    <ErrorPage errorType="404" />
                  </Route>
                </Switch>
              </ElementsContext.Provider>
            </div>
          </AuthContext.Provider>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { authSignIn })(App);
