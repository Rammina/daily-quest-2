import "./Home.css";

import React from "react";

class Home extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div data-test="component-home" className="home-container">
        <div id="home-girl-container"></div>
        <div className="home-welcome ui segment">
          <p id="home-paragraph">
            Check your{" "}
            <button id="home-projects-button" className="home-paragraph-button">
              {" "}
              Projects
            </button>{" "}
            for tasks you have to finish.{" "}
            <br className="linebreak-hide-mobile" /> The{" "}
            <button
              id="home-due-today-button"
              className="home-paragraph-button"
            >
              Due Today
            </button>{" "}
            section contains urgent tasks.{" "}
            <br className="linebreak-hide-mobile" /> Do your best!
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
