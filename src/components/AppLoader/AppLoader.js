import "./AppLoader.css";

import React from "react";

class AppLoader extends React.Component {
  state = {
    showLoader: true,
    loaderFadeClass: null
  };

  componentDidMount() {
    setTimeout(() => {
      // Screen loader
      if (document.readyState === "loading") {
        // Loading hasn't finished yet
        document.addEventListener("DOMContentLoaded", function() {
          this.setState({ loaderFadeClass: "no-display" });
          this.hideLoader(300);
        });
      } //Loading has already finished
      else if (
        document.readyState === "complete" ||
        document.readyState === "interactive" ||
        document.readyState === "loaded"
      ) {
        console.log(" HTML loaded");
        this.setState({ loaderFadeClass: "no-display" });
        this.hideLoader(300);
      }
    }, 5000000);
  }

  hideLoader = delay => {
    if (delay) {
      setTimeout(() => {
        this.setState({ showLoader: false });
      }, delay);
    } else {
      this.setState({ showLoader: false });
    }
  };

  render() {
    if (!this.state.showLoader) {
      return null;
    }
    return (
      <div className={`loader-container ${this.state.loaderFadeClass || null}`}>
        <div class="loader loader-2">
          <svg
            class="loader-star"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <polygon
              points="29.8 0.3 22.8 21.8 0 21.8 18.5 35.2 11.5 56.7 29.8 43.4 48.2 56.7 41.2 35.1 59.6 21.8 36.8 21.8 "
              fill="#18ffff"
            />
          </svg>
          <div class="loader-circles"></div>
        </div>
        {/* <p className="loader-p">Loading...</p> */}
      </div>
    );
  }
}
export default AppLoader;
