import "./ProjectItem.css";

import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";

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
        <button className="modal-close">x</button>
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
            <button
              className="modal-action-button cancel-button"
              id="edit-project-cancel"
            >
              Cancel
            </button>

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
    console.log("Activated");
    return (
      <React.Fragment>
        <button className="modal-close">x</button>
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
            <button
              className="modal-action-button cancel-button"
              id="delete-project-cancel"
            >
              Cancel
            </button>

            <button className="modal-action-button delete-confirm-button">
              Delete Project
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  };

  onModalOpen = target => {
    if (target.classList.contains("edit-button")) {
      if (!this.state.editModalOpened) {
        this.setState({ editModalOpened: true });
      }
    } else if (target.classList.contains("delete-button")) {
      if (!this.state.deleteModalOpened) {
        this.setState({ deleteModalOpened: true });
      }
    }
    return null;
  };

  renderModal = () => {
    if (this.state.editModalOpened) {
      return (
        <Modal
          title="Edit Project"
          sectionId="edit-project-content"
          content={this.renderEditContent}
          onDismiss={this.dismissModalHandler}
        />
      );
    } else if (this.state.deleteModalOpened) {
      return (
        <Modal
          title="Delete Project"
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

  onButtonClick = event => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target;
    this.onModalOpen(target);
  };

  render() {
    const modalContent = this.renderModal();

    return (
      <div
        className="item list-header"
        key={`${this.props.project.name}-${this.props.project.id}`}
      >
        <div className="content">
          <div className="description-text project">
            {this.props.project.name}
          </div>
          <button onClick={this.onButtonClick} className="project edit-button">
            edit
          </button>
          <button
            onClick={this.onButtonClick}
            className="project delete-button"
          >
            delete
          </button>
        </div>
        {modalContent}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return { projects: state.projects };
// };
export default connect(
  null,
  {}
)(ProjectItem);
