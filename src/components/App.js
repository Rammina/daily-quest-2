import "./App.css";

import React from "react";
import { Router, Route } from "react-router-dom";
import history from "../history";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Projects from "./Projects/Projects";
import Tasks from "./Tasks/Tasks";
import FinishedTasks from "./FinishedTasks/FinishedTasks";
import DueToday from "./DueToday/DueToday";
import { ElementsContext } from "./AppContext";

class App extends React.Component {
  state = {
    modalCloseButtonRef: null,
    modalProjectsSubmitButtonRef: null,
    modalProjectsDeleteButtonRef: null,
    modalTasksSubmitButtonRef: null,
    modalTasksDeleteButtonRef: null,
    modalDetailsEditButtonRef: null,
    modalDeleteAllButtonRef: null
  };

  setModalCloseButtonRef = ref => {
    this.setState({ modalCloseButtonRef: ref });
  };

  setModalProjectsSubmitButtonRef = ref => {
    this.setState({ modalProjectsSubmitButtonRef: ref });
    console.log(this.state.modalProjectsSubmitButtonRef);
  };

  setModalProjectsDeleteButtonRef = ref => {
    this.setState({ modalProjectsDeleteButtonRef: ref });
  };

  setModalDeleteAllButtonRef = ref => {
    this.setState({ modalDeleteAllButtonRef: ref });
  };

  setModalTasksSubmitButtonRef = ref => {
    this.setState({ modalTasksSubmitButtonRef: ref });
  };

  setModalTasksDeleteButtonRef = ref => {
    this.setState({ modalTasksDeleteButtonRef: ref });
  };

  setModalDetailsEditButtonRef = ref => {
    this.setState({ modalDetailsEditButtonRef: ref });
  };

  render() {
    return (
      <div data-test="component-app" className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <ElementsContext.Provider
              value={{
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
                modalDeleteAllButtonRef: this.state.modalDeleteAllButtonRef,
                setModalDeleteAllButtonRef: this.setModalDeleteAllButtonRef
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
