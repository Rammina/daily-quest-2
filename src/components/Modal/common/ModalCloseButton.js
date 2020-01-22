import React, { useEffect, useContext } from "react";
import { ElementsContext } from "../../AppContext";

const ModalCloseButton = props => {
  const context = useContext(ElementsContext);
  // this is the hook equivalent of componentDidMount
  // if the useEffect's second argument is [], it only runs the function inside
  // after the first render and no more
  useEffect(() => {
    // code to run on first render
  }, []);

  const onCloseClick = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <button
      ref={context.setModalCloseButtonRef}
      className="modal-close"
      onClick={onCloseClick}
    >
      x
    </button>
  );
};

export default ModalCloseButton;
