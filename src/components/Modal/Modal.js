import "./Modal.css";

import React from "react";
import ReactDOM from "react-dom";
import ModalCloseButton from "./common/ModalCloseButton";
import { ModalCloseButtonContext } from "../AppContext";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalBackdrop = React.createRef();
  }

  componentDidMount() {
    // console.log(this.context.setModalCloseButtonRef);
  }
  static contextType = ModalCloseButtonContext;

  onBackdropClick = event => {
    event.preventDefault();
    event.stopPropagation();

    this.props.onDismiss();
  };

  render() {
    return ReactDOM.createPortal(
      <div
        ref={this.modalBackdrop}
        onClick={e => this.onBackdropClick(e)}
        className={`backdrop ${this.props.backdropClass || null}`}
      >
        <section
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
          }}
          id={this.props.sectionId}
          className="modal-container"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <ModalCloseButton
            // setCloseButtonRef={this.props.setCloseButtonRef || null}
            onClose={() => this.props.onDismiss()}
          />
          {this.props.content()}
        </section>
      </div>,
      document.getElementById("modal")
    );
  }
}

export default Modal;
