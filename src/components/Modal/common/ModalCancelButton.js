import React from "react";

const ModalCancelButton = props => {
  const onCloseClick = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <button
      onClick={onCloseClick}
      className="modal-action-button cancel-button"
      id="delete-project-cancel"
      style={props.hideButtons}
    >
      Cancel
    </button>
  );
};

export default ModalCancelButton;
