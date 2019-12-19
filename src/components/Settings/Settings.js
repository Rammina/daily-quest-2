import "./Settings.css";
import EllipsisImg from "../../images/ellipsis.png";

import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";

class Settings extends React.Component {
  closeMenu = () => {
    this.props.closeModal();
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
    if (this.props.isModalOpen) {
      return ReactDOM.createPortal(
        <div
          onClick={e => {
            this.closeMenu();
          }}
          className={`backdrop settings ${this.props.backdropClass}`}
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
            if (this.props.isModalOpen) {
              this.closeMenu();
            } else {
              this.props.openModal();
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
