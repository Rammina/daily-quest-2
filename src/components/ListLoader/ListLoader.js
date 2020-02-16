import "./ListLoader.css";

import React from "react";

class ListLoader extends React.Component {
  state = {
    showLoader: true,
    loaderFadeClass: null
  };

  componentDidMount() {
    // This should have a listener instead from its parent
    // trigger fade upon finishing retrieval of items from database
    setTimeout(() => {
      if (document.readyState === "loading") {
        // Loading hasn't finished yet
        document.addEventListener("DOMContentLoaded", function() {
          this.setState({ loaderFadeClass: "no-display" });
          this.hideLoader(200);
        });
      } //Loading has already finished
      else if (
        document.readyState === "complete" ||
        document.readyState === "interactive" ||
        document.readyState === "loaded"
      ) {
        console.log(" HTML loaded");
        this.setState({ loaderFadeClass: "no-display" });
        this.hideLoader(200);
      }
    }, 200000);
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
    // note: conditionally make this disappear when data is loaded
    if (!this.state.showLoader) {
      return null;
    }
    return (
      <div
        className={`list-loader-container ${this.state.loaderFadeClass ||
          null}`}
      >
        <div className="list-loader-message-container">
          <div className="list-loader-text">
            <p className="list-loader-p">Loading...</p>
          </div>
        </div>
      </div>
    );
  }
}
export default ListLoader;
