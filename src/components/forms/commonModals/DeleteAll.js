import React from "react";
import { capitalizeFirstLetter } from "../../../helpers";

import TrashImg from "../../../images/trash.png";
import ModalCancelButton from "../../Modal/common/ModalCancelButton";

import { ElementsContext } from "../../AppContext";

class DeleteAll extends React.Component {
  static contextType = ElementsContext;

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
            <ModalCancelButton
              onClose={() => this.props.onClose()}
              autoFocus={true}
            />

            <button
              ref={this.context.setModalDeleteAllButtonRef}
              className="modal-action-button delete-confirm-button"
              onClick={() => {
                this.props.deleteFunction();
              }}
              onKeyDown={(e) => {
                if (e.key === "Tab" && !e.shiftKey) {
                  e.preventDefault();
                  e.stopPropagation();
                  // put the element to focus here
                  if (this.context.modalCloseButtonRef) {
                    this.context.modalCloseButtonRef.focus();
                  }
                }
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
