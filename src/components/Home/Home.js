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
              for tasks you <br className="home-lb-1400-1700" />
              have to finish. <br className="home-lb-600-900" />{" "}
              <br className="home-lb-min-1700" /> The{" "}
              <Link
                data-test="home-due-today-link"
                to="/due-today"
                id="home-due-today-button"
                className="home-paragraph-button"
              >
                Due Today
              </Link>{" "}
              section <br className="home-lb-1400-1700" />
              contains urgent tasks. <br className="home-lb-max-1200" />{" "}
              <br className="home-lb-min-1700" />
              Do your best!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
