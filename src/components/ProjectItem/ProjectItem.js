import "./ProjectItem.css";
import PencilImg from "../../images/rename.png";
import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";

import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";
import { deleteProject } from "../../actions";
import EditProject from "../forms/projects/EditProject";

class ProjectItem extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      edit: false,
      delete: false
    }
  };
  componentDidMount() {}

  renderDeleteContent = () => {
    return (
      <React.Fragment>
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
            <ModalCancelButton onClose={() => this.dismissModalHandler()} />

            <button
              className="modal-action-button delete-confirm-button"
              onClick={() => this.props.deleteProject(this.props.id)}
            >
              <img
                id="delete-trash-icon"
                className="trash modal-button-image"
                src={TrashImg}
                alt="Trashcan"
              />
              <span className="modal-button-text">Delete</span>
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

    if (target.hasChildNodes()) {
      if (target.classList.contains("edit-button")) {
        if (!this.state.modalsOpened.edit) {
          this.setState({ modalsOpened: { edit: true, any: true } });
        }
      } else if (target.classList.contains("delete-button")) {
        if (!this.state.modalsOpened.delete) {
          this.setState({ modalsOpened: { delete: true, any: true } });
        }
      }
    } else if (!target.hasChildNodes()) {
      if (target.parentElement.classList.contains("edit-button")) {
        if (!this.state.modalsOpened.edit) {
          this.setState({ modalsOpened: { edit: true, any: true } });
        }
      } else if (target.parentElement.classList.contains("delete-button")) {
        if (!this.state.modalsOpened.delete) {
          this.setState({ modalsOpened: { delete: true, any: true } });
        }
      }
    }

    return null;
  };

  renderModal = () => {
    if (this.state.modalsOpened.edit) {
      return (
        <Modal
          sectionId="edit-project-content"
          content={() => (
            <EditProject
              onClose={() => this.dismissModalHandler()}
              project={this.props.project}
              id={this.props.id}
            />
          )}
          onDismiss={() => this.dismissModalHandler()}
        />
      );
    } else if (this.state.modalsOpened.delete) {
      return (
        <Modal
          sectionId="delete-project-content"
          content={this.renderDeleteContent}
          onDismiss={() => this.dismissModalHandler()}
        />
      );
    }
    return null;
  };

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
          className="project content"
          // key={`${this.props.project.name}-${this.props.project.id}`}
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

const mapStateToProps = state => {
  return { projects: state.projects };
};

export default connect(mapStateToProps, { deleteProject })(ProjectItem);
