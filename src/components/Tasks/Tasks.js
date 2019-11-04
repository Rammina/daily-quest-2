// Since this is still under construction,
// Chances are lines in comment don't function yet
// However they might be intended to be used

// import "./Tasks.css";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
// import { fetchProject, createTask } from "../../actions";
import { Link } from "react-router-dom";

import TaskItem from "../TaskItem/TaskItem.js";
import Modal from "../Modal/Modal";
import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";

class Tasks extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      create: false
    }
  };

  componentDidMount() {
    // this needs to be able to receive the ID property of the project in
    // Preferably the URL parameter
    // this.props.fetchProject(this.props.match.params.id);
  }

  componentDidUpdate() {}

  onModalOpen = event => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.classList.contains("create-button")) {
      if (!this.state.modalsOpened.create) {
        this.setState({
          modalsOpened: { any: true, create: true }
        });
      }
    }
  };

  renderTasks = () => {
    const projectId = this.props.project.id;
    const { tasks } = this.props.project;
    if (tasks) {
      return tasks.map((task, index) => {
        return (
          <Link
            to={`/projects/${projectId}/tasks/${index}`}
            key={index}
            className="task item list-header"
          >
            <TaskItem task={task} />
          </Link>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  };

  renderCreateContent = () => {
    return (
      <React.Fragment>
        <ModalCloseButton
          onClose={() => {
            this.dismissModalHandler();
          }}
        />
        <h1 className="modal-header">Create New Task</h1>
        <form id="create-project-form">
          <div id="create-project-field-div">
            <input
              id="create-project-title-field"
              className="create-project-modal required text-field"
              type="text"
              name="project-title"
              placeholder="Project Title"
              maxLength="30"
              required="true"
              value=""
            />
          </div>

          <div
            className="two-buttons-container"
            id="create-project-buttons-container"
          >
            <ModalCancelButton
              onClose={() => {
                this.dismissModalHandler();
              }}
            />

            <input
              type="submit"
              className="form-submit"
              id="create-project-submit"
              value="Submit"
            />
          </div>
        </form>
      </React.Fragment>
    );
  };

  renderModal = () => {
    if (this.state.modalsOpened.create) {
      return (
        <Modal
          sectionId="create-project-content"
          content={this.renderCreateContent()}
          onDismiss={() => {
            this.dismissModalHandler();
          }}
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
    console.log(this.props.project);
    return (
      <React.Fragment>
        <div data-test="component-tasks" className="tasks-container">
          <div id="tasks-list" className="todolist ui segment">
            <div className="ui relaxed divided list">
              <div className="task item list-header">
                <div className="task content">
                  <div className="header header-text task">My Tasks</div>
                </div>
                <div>
                  <button className="create-button" onClick={this.onModalOpen}>
                    +
                  </button>
                </div>
              </div>
              {this.renderTasks()}
            </div>
          </div>
        </div>
        {this.renderModal()}
      </React.Fragment>
    );
  }
}

// I currently don't know which
// specific state properties to assign to this component
const mapStateToProps = state => {};

export default connect(
  mapStateToProps,
  {
    // fetchProject,
    // createProject
  }
)(Tasks);
