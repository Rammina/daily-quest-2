import React from "react";
import { connect } from "react-redux";
import { capitalizeFirstLetter } from "../../../helpers";

import TrashImg from "../../../images/trash.png";
import ModalCancelButton from "../../Modal/common/ModalCancelButton";

class DeleteAll extends React.Component {
  renderDataObjectName = () => {
    const name = this.props.dataObject.name;
    return name ? (
      <p className="modal-paragraph delete-item-title">{name}</p>
    ) : null;
  };
  render() {
    const { itemName } = this.props;
    return (
      <React.Fragment>
        <h1 className="modal-header">
          Delete All {capitalizeFirstLetter(itemName)}
        </h1>
        <form id="delete-project-form">
          <p className="modal-paragraph">
            Would you like to delete all of your {itemName}?
          </p>
          <p className="modal-paragraph modal-warning">
            WARNING: All deleted {itemName}' data cannot be recovered!
          </p>
          {this.renderDataObjectName()}
          <div
            className="two-buttons-container"
            id="delete-project-buttons-container"
          >
            <ModalCancelButton onClose={() => this.props.onClose()} />

            <button
              className="modal-action-button delete-confirm-button"
              // this needs the fire an action that deletes all
              // of the items specified
              onClick={() => {
                // projects should be required (implied if no arguments)
                // a specific project key is the first argument
                // key is the object key/URL
                this.props.deleteFunction();
              }}
            >
              <img
                id="delete-trash-icon"
                className="trash modal-button-image"
                src={TrashImg}
                alt="Trashcan"
              />
              <span className="modal-button-text">Delete</span>
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default DeleteAll;