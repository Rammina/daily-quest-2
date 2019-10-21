import "./ProjectItem.css";
import PencilImg from "../../images/rename.png";
import TrashImg from "../../images/trash.png";

import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";
import { deleteProject } from '../../actions';

class ProjectItem extends React.Component {
  state = {
    modalOpened: false,
    editModalOpened: false,
    deleteModalOpened: false
  };
  componentDidMount() {}

  renderEditContent = () => {
    return (
      <React.Fragment>
        <ModalCloseButton onClose={this.dismissModalHandler} />
        <h1 className="modal-header">Rename Project</h1>
        <form id="edit-project-form">
          <div id="edit-project-field-div">
            <input
              id="edit-project-title-field"
              className="edit-project-modal required text-field"
              type="text"
              name="project-title"
              placeholder="Project Title"
              maxLength="30"
              required="true"
              value={this.props.project.name}
            />
          </div>

          <div
            className="two-buttons-container"
            id="edit-project-buttons-container"
          >
            <ModalCancelButton onClose={this.dismissModalHandler} />

            <input
              type="submit"
              className="form-submit"
              id="edit-project-submit"
              value="Submit"
            />
          </div>
        </form>
      </React.Fragment>
    );
  };

  renderDeleteContent = () => {
    return (
      <React.Fragment>
        <ModalCloseButton onClose={this.dismissModalHandler} />
        <h1 className="modal-header">Delete Project</h1>
        <form id="delete-project-form">
          <p className="modal-paragraph">
            Would you like to delete this project?
          </p>
          <p className="modal-paragraph modal-warning">
            WARNING: All deleted tasks' data cannot be recovered!
          </p>
          <p className="modal-paragraph delete-item-title">
            {this.props.project.name}
          </p>
          <div
            className="two-buttons-container"
            id="delete-project-buttons-container"
          >
            <ModalCancelButton onClose={this.dismissModalHandler} />

            <button 
              className="modal-action-button delete-confirm-button"
              onClick={() => this.props.deleteProject(this.project.id)}
            >
              Delete Project
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  };

  onModalOpen = event => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;
    if (target.classList.contains("edit-button")) {
      if (!this.state.editModalOpened) {
        this.setState({ editModalOpened: true, modalOpened: true });
      }
    } else if (target.classList.contains("delete-button")) {
      if (!this.state.deleteModalOpened) {
        this.setState({ deleteModalOpened: true, modalOpened: true });
      }
    }
    return null;
  };

  renderModal = () => {
    if (this.state.editModalOpened) {
      return (
        <Modal
          sectionId="edit-project-content"
          content={this.renderEditContent}
          onDismiss={this.dismissModalHandler}
        />
      );
    } else if (this.state.deleteModalOpened) {
      return (
        <Modal
          sectionId="delete-project-content"
          content={this.renderDeleteContent}
          onDismiss={this.dismissModalHandler}
        />
      );
    }
    return null;
  };

  dismissModalHandler = () => {
    this.setState({
      modalOpened: false,
      editModalOpened: false,
      deleteModalOpened: false
    });
  };


  render() {
    const modalContent = this.renderModal();

    return (
      <React.Fragment>
        <div
          className="project content"
          key={`${this.props.project.name}-${this.props.project.id}`}
        >
          <div className="item-flex project">
            <div className="description-text project">
              {this.props.project.name}
            </div>
            <span className="project list-buttons-container">
              <button
                onClick={this.onModalOpen}
                className="project edit-button icon-button"
              >
                <img className="icon-image" src={PencilImg} alt="Pencil" />
              </button>
              <button
                onClick={this.onModalOpen}
                className="project delete-button icon-button"
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

// const mapStateToProps = state => {
//   return { projects: state.projects };
// };
export default connect(
  null,
  {deleteProject}
)(ProjectItem);
