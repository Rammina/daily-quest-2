import "./Home.css";

import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div data-test="component-home" className="home-container">
        <div className="home-welcome-container">
          <div id="home-girl-container" />
          <div className="home-welcome ui segment">
            <p id="home-paragraph">
              Check your{" "}
              <Link
                data-test="home-projects-link"
                to="/projects"
                id="home-projects-button"
                className="home-paragraph-button"
              >
                {" "}
                Projects
              </Link>{" "}
              for tasks you have to finish.{" "}
              <br className="linebreak-hide-mobile" /> The{" "}
              <Link
                data-test="home-due-today-link"
                to="/due-today"
                id="home-due-today-button"
                className="home-paragraph-button"
              >
                Due Today
              </Link>{" "}
              section contains urgent tasks.{" "}
              <br className="linebreak-hide-mobile" /> Do your best!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
