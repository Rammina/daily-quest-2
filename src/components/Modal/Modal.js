import "./Modal.css";

import React from "react";
import ReactDOM from "react-dom";
import history from "../../history";

const Modal = props => {
  const onBackdropClick = event => {
    event.preventDefault();
    event.stopPropagation();
    props.onDismiss();
  };

  const onModalContentClick = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div onClick={onBackdropClick} className="backdrop">
      //Get rid of this
      <section
        onClick={onModalContentClick}
        className="modal-container"
        id="edit-project-content"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        {props.content}
      </section>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
