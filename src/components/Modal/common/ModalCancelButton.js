import React from "react";

const ModalCancelButton = props => {
  const onCloseClick = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <button
      onClick={e => {
        if (e.target === this) {
          onCloseClick();
        }
      }}
      className="modal-action-button cancel-button"
      id="delete-project-cancel"
    >
      Cancel
    </button>
  );
};

export default ModalCancelButton;
