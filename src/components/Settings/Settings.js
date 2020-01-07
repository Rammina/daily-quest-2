import "./Settings.css";
import EllipsisImg from "../../images/ellipsis.png";

import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    // this.settingsButton = React.createRef();
  }
  closeMenu = () => {
    this.props.closeModal();
  };
  renderList = () => {
    const renderItems = () => {
      const settingItems = this.props.settingItems;
      if (settingItems) {
        return settingItems.map((item, index) => {
          return (
            <li className="settings-submenu-item" key={`0${index}`}>
              <button
                onClick={e => {
                  if (typeof item.method === "function") {
                    item.method(e);
                  }
                }}
                className={`settings-submenu-button ${this.props.backdropClass}`}
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
            setTimeout(() => {
              this.props.focusEllipsisButton();
            }, 201);
          }}
          className={`backdrop settings ${this.props.backdropClass}`}
        >
          <section
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
            }}
            id="settings-submenu"
            className={`modal-container settings ${this.props.backdropClass}`}
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
          ref={this.props.setEllipsisRef}
          onClick={e => {
            if (this.props.isModalOpen) {
              this.closeMenu();
            } else {
              this.props.openModal();
            }
          }}
          className={`settings icon-button ${this.props.ellipsisClass}`}
        >
          <img
            className={`icon-image black ${this.props.ellipsisClass}`}
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
