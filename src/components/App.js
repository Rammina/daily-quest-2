import "./App.css";

import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";

import AppLoader from "./AppLoader/AppLoader";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Projects from "./Projects/Projects";
import Tasks from "./Tasks/Tasks";
import FinishedTasks from "./FinishedTasks/FinishedTasks";
import DueToday from "./DueToday/DueToday";

import { ElementsContext, NavContext } from "./AppContext";

class App extends React.Component {
  state = {
    modalCloseButtonRef: null,
    modalDeleteAllButtonRef: null,
    modalProjectsSubmitButtonRef: null,
    modalProjectsDeleteButtonRef: null,
    modalTasksSubmitButtonRef: null,
    modalTasksDeleteButtonRef: null,
    modalDetailsEditButtonRef: null,
    modalDetailsDeleteButtonRef: null,
    firstSettingsItem: null,
    navMenuCloseButtonRef: null,
    lastNavMenuItemRef: null
  };

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
    return (
      <div data-test="component-app" className="ui container">
        <Router history={history}>
          <AppLoader />
          <div>
            <NavContext.Provider
              value={{
                // NAV MENU
                navMenuCloseButtonRef: this.state.navMenuCloseButtonRef,
                setNavMenuCloseButtonRef: this.setNavMenuCloseButtonRef,
                //
                lastNavMenuItemRef: this.state.lastNavMenuItemRef,
                setLastNavMenuItemRef: this.setLastNavMenuItemRef
              }}
            >
              <Header />
            </NavContext.Provider>
            <ElementsContext.Provider
              value={{
                // main body content
                //
                modalCloseButtonRef: this.state.modalCloseButtonRef,
                setModalCloseButtonRef: this.setModalCloseButtonRef,
                //PROJECTS
                modalProjectsSubmitButtonRef: this.state
                  .modalProjectsSubmitButtonRef,
                setModalProjectsSubmitButtonRef: this
                  .setModalProjectsSubmitButtonRef,
                //
                modalProjectsDeleteButtonRef: this.state
                  .modalProjectsDeleteButtonRef,
                setModalProjectsDeleteButtonRef: this
                  .setModalProjectsDeleteButtonRef,
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
                modalDetailsDeleteButtonRef: this.state
                  .modalDetailsDeleteButtonRef,
                setModalDetailsDeleteButtonRef: this
                  .setModalDetailsDeleteButtonRef,
                //
                modalDeleteAllButtonRef: this.state.modalDeleteAllButtonRef,
                setModalDeleteAllButtonRef: this.setModalDeleteAllButtonRef,
                // SETTINGS
                firstSettingsItem: this.state.firstSettingsItem,
                setFirstSettingsItem: this.setFirstSettingsItem
              }}
            >
              <Route path="/" exact component={Home} />
              <Route path="/projects" exact component={Projects} />
              <Route path="/projects/:id" exact component={Tasks} />
              <Route path="/due-today" exact component={DueToday} />
              <Route path="/finished-tasks" exact component={FinishedTasks} />
            </ElementsContext.Provider>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
