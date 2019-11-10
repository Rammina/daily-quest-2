import "./Modal.css";

import React from "react";
import ReactDOM from "react-dom";
import ModalCloseButton from "../Modal/common/ModalCloseButton";

const Modal = props => {
  const onBackdropClick = event => {
    event.preventDefault();
    event.stopPropagation();
    props.onDismiss();
  };

  return ReactDOM.createPortal(
    <div onClick={onBackdropClick} className="backdrop">
      <section
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();
        }}
        id={props.sectionId}
        className="modal-container"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <ModalCloseButton onClose={props.onDismiss} />
        {props.content()}
      </section>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
