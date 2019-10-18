import React from "react";

const ModalCloseButton = props => {
  const onCloseClick = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <button className="modal-close" onClick={onCloseClick}>
      x
    </button>
  );
};

export default ModalCloseButton;
