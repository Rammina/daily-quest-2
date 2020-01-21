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
import { ModalCloseButtonContext } from "./AppContext";

class App extends React.Component {
  state = {
    modalCloseButtonRef: null,
    setModalCloseButtonRef: this.setModalCloseButtonRef
  };

  setModalCloseButtonRef = ref => {
    // this is used in case the state doesn't work
    // this.modalCloseButtonRef = ref;
    console.log(`before it is ${this.state.modalCloseButtonRef}`);
    this.setState({ modalCloseButtonRef: ref });
    console.log(`after it is ${this.state.modalCloseButtonRef}`);
  };

  render() {
    return (
      <div data-test="component-app" className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <ModalCloseButtonContext.Provider
              value={{
                modalCloseButtonRef: this.state.modalCloseButtonRef,
                setModalCloseButtonRef: this.setModalCloseButtonRef
              }}
            >
              <Route path="/" exact component={Home} />
              <Route path="/projects" exact component={Projects} />
              <Route path="/projects/:id" exact component={Tasks} />
              <Route path="/due-today" exact component={DueToday} />
              <Route path="/finished-tasks" exact component={FinishedTasks} />
            </ModalCloseButtonContext.Provider>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
