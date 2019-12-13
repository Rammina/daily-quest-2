import "./Settings.css";
import EllipsisImg from "../../images/ellipsis.png";

import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";

class Settings extends React.Component {
  state = {
    modalsOpened: { settings: false }
  };

  closeMenu() {
    setTimeout(() => this.setState({ modalsOpened: { settings: false } }), 200);
  }

  renderMenu() {
    if (this.state.modalsOpened.settings) {
      return ReactDOM.createPortal(
        <div
          onClick={e => {
            e.target.classList.add("closed");
            this.closeMenu();
          }}
          className="backdrop settings"
        >
          <section
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
            }}
            id="settings-submenu"
            className="modal-container settings"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            {this.props.content || null}
            <ul>
              <li>Delete All {this.props.dataType || null}</li>
              <li>Sort ascending</li>
              <li>Sort descending</li>
            </ul>
          </section>
        </div>,
        document.getElementById("modal")
      );
    }
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <button
          // Should open a modal on mobile and a drop-down on desktop view
          onClick={e => this.setState({ modalsOpened: { settings: true } })}
          className="settings icon-button"
        >
          <img
            className="icon-image black"
            src={EllipsisImg}
            alt="Ellipsis icon"
          />
        </button>
        {this.renderMenu()}
      </React.Fragment>
    );
  }
}
export default Settings;
