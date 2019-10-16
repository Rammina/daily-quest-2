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
        <h1 className="modal-header">Edit a Project</h1>
        <form id="edit-project-form">
          <div id="edit-project-field-div">
            <input
              id="edit-project-title-field"
              className="edit-project-modal required text-field"
              type="text"
              name="project-title"
              placeholder="Project Title"
              maxlength="30"
              required="true"
            />
          </div>

          <input
            type="submit"
            className="form-submit"
            id="edit-project-submit"
            value="Add This Project"
          />
        </form>
      </React.Fragment>
    );
  };

  renderDeleteContent = () => {
    return (
      <React.Fragment>
        <button className="modal-close">x</button>
        <h1 className="modal-header">Delete a Project</h1>
        <form id="delete-project-form">
          <div id="delete-project-field-div">
            <input
              id="delete-project-title-field"
              className="delete-project-modal required text-field"
              type="text"
              name="project-title"
              placeholder="Project Title"
              maxlength="30"
              required="true"
            />
          </div>

          <input
            type="submit"
            className="form-submit"
            id="delete-project-submit"
            value="Add This Project"
          />
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
          content={this.renderEditContent()}
          onDismiss={this.dismissModalHandler}
        />
      );
    } else if (this.state.deleteModalOpened) {
      return (
        <Modal
          title="Delete Project"
          content={"."}
          action={"."}
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
