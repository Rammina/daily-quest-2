import "./LoadingSpinner.css";

import React from "react";

const LoadingSpinner = (props) => {
  return props.showLoader ? (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : null;
};

export default LoadingSpinner;
