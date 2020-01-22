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
    modalTasksSubmitButtonRef: null,
    modalDetailsEditButtonRef: null
  };

  setModalCloseButtonRef = ref => {
    this.setState({ modalCloseButtonRef: ref });
  };

  setModalProjectsSubmitButtonRef = ref => {
    this.setState({ setModalProjectsSubmitButtonRef: ref });
  };

  setModalTasksSubmitButtonRef = ref => {
    this.setState({ setModalTasksSubmitButtonRef: ref });
  };

  setModalDetailsEditButtonRef = ref => {
    this.setState({ setModalDetailsEditButtonRef: ref });
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
                //
                modalProjectsSubmitButtonRef: this.modalProjectsSubmitButtonRef,
                setModalProjectsSubmitButtonRef: this
                  .setModalProjectsSubmitButtonRef,
                //
                modalTasksSubmitButtonRef: this.modalTasksSubmitButtonRef,
                setModalTasksSubmitButtonRef: this.setModalTasksSubmitButtonRef,
                //
                modalDetailsEditButtonRef: this.modalDetailsEditButtonRef,
                setModalDetailsEditButtonRef: this.setModalDetailsEditButtonRef
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
