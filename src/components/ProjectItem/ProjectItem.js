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
import { ellipsifyString } from "../../helpers";
import { ElementsContext } from "../AppContext";

class ProjectItem extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      edit: false,
      delete: false
    },
    backdropClass: null
  };

  static contextType = ElementsContext;

  // refs(outside constructor)
  editButtonRef = React.createRef();
  deleteButtonRef = React.createRef();

  componentDidMount() {}

  // focus methods
  focusEditButton = () => {
    this.editButtonRef.current.focus();
  };

  focusDeleteButton = () => {
    this.deleteButtonRef.current.focus();
  };

  // methods related to Settings component
  closeSettings = () => {
    if (this.props.closeSettings) this.props.closeSettings();
    return null;
  };

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
            <ModalCancelButton
              onClose={() => this.dismissModalHandler()}
              autoFocus={true}
            />

            <button
              className="modal-action-button delete-confirm-button"
              onKeyDown={e => {
                if (e.key === "Tab") {
                  e.preventDefault();
                  e.stopPropagation();
                  // put the element to focus here
                  if (this.context.modalCloseButtonRef) {
                    this.context.modalCloseButtonRef.focus();
                  }
                }
              }}
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

  onModalOpen = (e, modalType) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ modalsOpened: { any: true, [modalType]: true } });
  };

  renderModal = () => {
    if (this.state.modalsOpened.edit) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="edit-project-content"
          content={() => (
            <EditProject
              onClose={() => {
                this.dismissModalHandler();
                setTimeout(() => {
                  this.focusEditButton();
                }, 200);
              }}
              project={this.props.project}
              id={this.props.id}
            />
          )}
          onDismiss={() => {
            this.dismissModalHandler();
            setTimeout(() => {
              this.focusEditButton();
            }, 200);
          }}
        />
      );
    } else if (this.state.modalsOpened.delete) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="delete-project-content"
          content={this.renderDeleteContent}
          onDismiss={() => {
            this.dismissModalHandler();
            setTimeout(() => {
              this.focusDeleteButton();
            }, 200);
          }}
        />
      );
    }
    return null;
  };

  dismissModalHandler = () => {
    this.setState({ backdropClass: "closed" });
    const modalsOpened = _.mapValues(this.state.modalsOpened, () => false);
    setTimeout(() => {
      this.setState({
        modalsOpened,
        backdropClass: null
      });
    }, 201);
  };

  render() {
    const modalContent = this.renderModal();
    const { project } = this.props;
    return (
      <React.Fragment>
        <div
          className="project content"
          // key={`${this.props.project.name}-${this.props.project.id}`}
        >
          <div className="item-flex project">
            <div className="description-text project">
              {ellipsifyString(project.name, 13)}
              <span className="project-count-span">
                {project.tasks ? Object.keys(project.tasks).length : 0}
              </span>
            </div>
            <span className="project list-buttons-container">
              <button
                ref={this.editButtonRef}
                className="project edit-button icon-button"
                onClick={e => {
                  this.onModalOpen(e, "edit");
                  this.props.closeSettings();
                }}
              >
                <img className="icon-image" src={PencilImg} alt="Pencil" />
              </button>
              <button
                ref={this.deleteButtonRef}
                className="project delete-button icon-button"
                onClick={e => {
                  this.onModalOpen(e, "delete");
                  this.props.closeSettings();
                }}
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

export default connect(
  mapStateToProps,
  { deleteProject }
)(ProjectItem);
