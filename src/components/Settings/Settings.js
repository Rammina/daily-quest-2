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
            // const x = e.clientX;
            // const y = e.clientY;
            e.target.classList.add("closed");
            this.closeMenu();
            // setTimeout(() => {
            // document.elementFromPoint(x, y).click();
            // }, 201);
            // document.elementFromPoint(x, y).click();
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
            <ul className="settings-submenu-items">
              <li className="settings-submenu-item">
                <button
                  onClick={() => {
                    if (
                      typeof this.props.sortAscendingFunction === "function"
                    ) {
                      this.props.sortAscendingFunction();
                    }
                  }}
                  className="settings-submenu-button"
                >
                  Sort ascending (name)
                </button>
              </li>
              <li className="settings-submenu-item">
                <button
                  onClick={() => {
                    if (
                      typeof this.props.sortDescendingFunction === "function"
                    ) {
                      this.props.sortDescendingFunction();
                    }
                  }}
                  className="settings-submenu-button"
                >
                  Sort descending (name)
                </button>
              </li>
              <li className="settings-submenu-item">
                <button
                  onClick={e => {
                    if (typeof this.props.deleteFunction === "function") {
                      this.props.deleteFunction(e);
                      this.closeMenu();
                    }
                  }}
                  className="settings-submenu-button"
                >
                  Delete all {this.props.dataType || null}
                </button>
              </li>
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
          onClick={e => {
            console.log(this.state.modalsOpened.settings);
            if (this.state.modalsOpened.settings) {
              this.closeMenu();
            } else {
              this.setState({ modalsOpened: { settings: true } });
            }
          }}
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
