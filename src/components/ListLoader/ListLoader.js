import "./ListLoader.css";

import React from "react";

class ListLoader extends React.Component {
  state = {
    // loaderFadeClass: null
  };

  componentDidMount() {}

  render() {
    // note: conditionally make this disappear when data is loaded
    if (!this.props.showLoader) {
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
