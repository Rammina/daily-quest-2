import "./Tasks.css";
import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchProject, createTask, deleteAllTasks } from "../../actions";
import { Link } from "react-router-dom";

import TaskItem from "../TaskItem/TaskItem.js";
import DeleteAll from "../forms/commonModals/DeleteAll";
import Modal from "../Modal/Modal";
import ModalCloseButton from "../Modal/common/ModalCloseButton";
import ModalCancelButton from "../Modal/common/ModalCancelButton";

import CreateTask from "../forms/tasks/CreateTask";

class Tasks extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      create: false,
      deleteAll: false
    },
    selectedTask: null,
    backdropClass: null
  };

  componentDidMount() {
    // this needs to be able to receive the ID property of the project in
    // Preferably the URL parameter
    this.props.fetchProject(this.props.match.params.id);
  }

  componentDidUpdate() {}

  onModalOpen = modalType => {
    if (!this.state.modalsOpened.any) {
      this.setState({
        modalsOpened: { any: true, [modalType]: true }
      });
    }
  };
  renderTasks = () => {
    const projectId = this.props.project.id;
    const tasks = this.props.project.tasks;
    if (tasks) {
      const items = [];
      for (let taskKey in tasks) {
        if (tasks.hasOwnProperty(taskKey)) {
          items.push(
            <div
              key={taskKey}
              tabIndex="0"
              className="task item list-header task-item-details"
            >
              <TaskItem
                hideProjectName={true}
                task={tasks[taskKey]}
                taskId={taskKey}
                projectId={this.props.match.params.id}
              />
            </div>
          );
        }
      }
      return items;
    } else {
      return (
        <div style={{ color: "white", textAlign: "center" }}>
          There are no tasks found.
        </div>
      );
    }
  };

  renderModal = () => {
    console.log(this.state.modalsOpened);

    if (this.state.modalsOpened.create) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="create-task-content"
          content={() => {
            // this.props.match.url should be given to create project so it does not lose track
            // of where the URL address is
            return (
              <CreateTask
                onClose={this.dismissModalHandler}
                id={this.props.match.params.id}
              />
            );
          }}
          onDismiss={() => {
            this.dismissModalHandler();
          }}
        />
      );
    } else if (this.state.modalsOpened.deleteAll) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="delete-all-task-content"
          content={() => (
            <DeleteAll
              itemName="tasks"
              dataObject={this.props.project}
              onClose={() => {
                this.dismissModalHandler();
              }}
              deleteFunction={async () => {
                await this.props.deleteAllTasks(this.props.project.id);
                this.dismissModalHandler();
              }}
            />
          )}
          onDismiss={() => this.dismissModalHandler()}
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
    console.log(this.props.project);
    console.log(this.props.match.params.id);
    return (
      <React.Fragment>
        <div data-test="component-tasks" className="tasks-container">
          <div id="tasks-list" className="todolist ui segment">
            <div className="ui relaxed divided list">
              <div className="task item list-header first">
                <div className="task content">
                  <div className="header header-text task">
                    {this.props.project.name}
                  </div>
                </div>
                <div style={{ width: "9rem" }}>
                  <button
                    className="create-button"
                    onClick={() => {
                      this.onModalOpen("create");
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={e => this.onModalOpen(e, "deleteAll")}
                    className="task delete-button icon-button black"
                  >
                    <img
                      className="icon-image black"
                      src={TrashImg}
                      alt="Trash Can"
                    />
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
const mapStateToProps = state => {
  console.log(state.selectedProject);
  return { project: state.selectedProject };
};

export default connect(
  mapStateToProps,
  {
    fetchProject,
    deleteAllTasks
    // createProject
  }
)(Tasks);
