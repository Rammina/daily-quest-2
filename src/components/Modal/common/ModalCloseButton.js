import React, { useEffect, useContext } from "react";
import { ElementsContext } from "../../AppContext";

const ModalCloseButton = props => {
  const context = useContext(ElementsContext);
  // this is the hook equivalent of componentDidMount
  // if the useEffect's second argument is [], it only runs the function inside
  // after the first render and no more
  useEffect(() => {
    // code to run on first render
    console.log(context);
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
      onKeyDown={e => {
        if (e.shiftKey && e.key === "Tab") {
          e.preventDefault();
          e.stopPropagation();
          // put the element to focus here
          setTimeout(() => {
            if (context.modalProjectsSubmitButtonRef) {
              context.modalProjectsSubmitButtonRef.focus();
            } else if (context.modalProjectsDeleteButtonRef) {
              context.modalProjectsDeleteButtonRef.focus();
            } else if (context.modalTasksSubmitButtonRef) {
              context.modalTasksSubmitButtonRef.focus();
            } else if (context.modalTasksDeleteButtonRef) {
              context.modalTasksDeleteButtonRef.focus();
            } else if (context.modalDetailsEditButtonRef) {
              context.modalDetailsEditButtonRef.focus();
            } else if (context.modalDeleteAllButtonRef) {
              console.log(context.modalDeleteAllButtonRef);
              context.modalDeleteAllButtonRef.focus();
            }
          }, 0);
        }
      }}
    >
      x
    </button>
  );
};

export default ModalCloseButton;
