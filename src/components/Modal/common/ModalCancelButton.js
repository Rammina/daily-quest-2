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
    >
      Cancel
    </button>
  );
};

export default ModalCancelButton;
