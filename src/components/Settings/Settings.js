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

  closeMenu = () => {
    setTimeout(() => this.setState({ modalsOpened: { settings: false } }), 200);
  };
  renderList = () => {
    const renderItems = () => {
      const settingItems = this.props.settingItems;
      if (settingItems) {
        return settingItems.map(item => {
          return (
            <li className="settings-submenu-item">
              <button
                onClick={e => {
                  if (typeof item.method === "function") {
                    item.method(e);
                  }
                }}
                className="settings-submenu-button"
              >
                {item.text}
              </button>
            </li>
          );
        });
      }
      return null;
    };
    return <ul className="settings-submenu-items">{renderItems()}</ul>;
  };
  renderMenu = () => {
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
            {this.renderList()}
          </section>
        </div>,
        document.getElementById("modal")
      );
    }
    return null;
  };

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
