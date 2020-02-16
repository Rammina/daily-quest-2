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
    }, 500);
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
        <div className="loader-message-container">
          <div className="loader-text">
            <p className="loader-p">Loading...</p>
          </div>
        </div>
      </div>
    );
  }
}
export default AppLoader;
