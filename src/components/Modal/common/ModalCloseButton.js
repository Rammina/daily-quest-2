import React, { useEffect, useContext } from "react";
import { ModalCloseButtonContext } from "../../AppContext";

const ModalCloseButton = props => {
  const context = useContext(ModalCloseButtonContext);
  // this is the hook equivalent of componentDidMount
  // if the useEffect's second argument is [], it only runs the function inside
  // after the first render and no more
  useEffect(() => {
    // code to run on first render
    // note: set the reference from here
    console.log(context);
  }, []);

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
