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

const ModalCloseButtonContext = React.createContext(null);

class App extends React.Component {
  state = {
    modalCloseButtonRef: null,
    setModalCloseButtonRef: this.setModalCloseButtonRef
  };

  setModalCloseButtonRef = ref => {
    // this is used in case the state doesn't work
    // this.modalCloseButtonRef = ref;
    this.setState({ modalCloseButtonRef: ref });
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
                setModalCloseButtonRef: this.state.setModalCloseButtonRef
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
