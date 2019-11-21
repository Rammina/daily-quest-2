import "./TaskItem.css";
import PencilImg from "../../images/rename.png";
import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";
// import { deleteTask } from "../../actions";

class TaskItem extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      edit: false,
      delete: false
    }
  };
  componentDidMount() {}

  // This would look completely different if it's a task you're editing
  // renderEditContent = () => {
  //   return (
  //     <React.Fragment>
  //       <ModalCloseButton onClose={this.dismissModalHandler} />
  //       <h1 className="modal-header">Rename Task</h1>
  //       <form id="edit-task-form">
  //         <div id="edit-task-field-div">
  //           <input
  //             id="edit-task-title-field"
  //             className="edit-task-modal required text-field"
  //             type="text"
  //             name="task-title"
  //             placeholder="Task Title"
  //             maxLength="30"
  //             required="true"
  //             value={this.props.task.name}
  //           />
  //         </div>
  //
  //         <div
  //           className="two-buttons-container"
  //           id="edit-task-buttons-container"
  //         >
  //           <ModalCancelButton onClose={this.dismissModalHandler} />
  //
  //           <input
  //             type="submit"
  //             className="form-submit"
  //             id="edit-task-submit"
  //             value="Submit"
  //           />
  //         </div>
  //       </form>
  //     </React.Fragment>
  //   );
  // };

  // this can pass looking similar to the project version
  renderDeleteContent = () => {
    return (
      <React.Fragment>
        <ModalCloseButton onClose={this.dismissModalHandler} />
        <h1 className="modal-header">Delete Task</h1>
        <form id="delete-task-form">
          <p className="modal-paragraph">Would you like to delete this task?</p>
          <p className="modal-paragraph modal-warning">
            WARNING: All deleted tasks' data cannot be recovered!
          </p>
          <p className="modal-paragraph delete-item-title">
            {this.props.task.name}
          </p>
          <div
            className="two-buttons-container"
            id="delete-task-buttons-container"
          >
            <ModalCancelButton onClose={this.dismissModalHandler} />

            <button
              className="modal-action-button delete-confirm-button"
              onClick={() => this.props.deleteTask(this.task.id)}
            >
              Delete Task
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  };

  // This honestly could be recycled instead as a general helper function
  onModalOpen = event => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;
    if (target.classList.contains("edit-button")) {
      if (!this.state.modalsOpened.edit) {
        this.setState({ modalsOpened: { any: true, edit: true } });
      }
    } else if (target.classList.contains("delete-button")) {
      if (!this.state.modalsOpened.delete) {
        this.setState({ modalsOpened: { any: true, delete: true } });
      }
    }
    return null;
  };

  // This also could be recyclable
  renderModal = () => {
    if (this.state.modalsOpened.edit) {
      return (
        <Modal
          sectionId="edit-task-content"
          content={this.renderEditContent}
          onDismiss={this.dismissModalHandler}
        />
      );
    } else if (this.state.modalsOpened.delete) {
      return (
        <Modal
          sectionId="delete-task-content"
          content={this.renderDeleteContent}
          onDismiss={this.dismissModalHandler}
        />
      );
    }
    return null;
  };

  // We already recycle this
  dismissModalHandler = () => {
    const modalsOpened = _.mapValues(this.state.modalsOpened, () => false);
    this.setState({
      modalsOpened
    });
  };

  render() {
    const modalContent = this.renderModal();

    return (
      <React.Fragment>
        <div
          className="task content"
          key={`${this.props.task.name}-${this.props.task.id}`}
        >
          <div className="item-flex task">
            <div className="description-text task">{this.props.task.name}</div>
            <span className="task list-buttons-container">
              <button
                onClick={this.onModalOpen}
                className="task edit-button icon-button"
              >
                <img className="icon-image" src={PencilImg} alt="Pencil" />
              </button>
              <button
                onClick={this.onModalOpen}
                className="task delete-button icon-button"
              >
                <img className="icon-image" src={TrashImg} alt="Trash Can" />
              </button>
            </span>
          </div>
        </div>
        {modalContent}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { project: state.selectedProject };
};
export default connect(
  null
  // { deleteTask }
)(TaskItem);
