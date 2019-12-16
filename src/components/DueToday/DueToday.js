import TrashImg from "../../images/trash.png";

import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TaskItem from "../TaskItem/TaskItem.js";
import Modal from "../Modal/Modal";
import DeleteAll from "../forms/commonModals/DeleteAll";
import {
  fetchDueToday,
  deleteTask,
  deleteAllDueTodayTasks
} from "../../actions";
import { ellipsifyString } from "../../helpers/index.js";

class DueToday extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      details: false,
      deleteAll: false
    },
    selectedTask: null,
    backdropClass: null
  };

  componentDidMount() {
    // This should call fetch due today
    this.props.fetchDueToday();
  }

  componentDidUpdate() {}

  onModalOpen = modalType => {
    this.setState({
      modalsOpened: { any: true, [modalType]: true }
    });
  };
  renderTasks = () => {
    const tasks = this.props.dueToday;
    if (Object.keys(tasks).length >= 1) {
      return tasks.map((task, index) => (
        <div
          key={task.id}
          tabIndex="0"
          className="task item list-header task-item-details"
        >
          <TaskItem
            hideDate={true}
            // Find a way to make checkbox toggle work
            // hideCheckbox={true}
            task={task}
            taskId={task.id}
            dueTodayIndex={index + ""}
            projectId={task.projectId}
            projectName={ellipsifyString(task.projectName, 13)}
            // hideActionButtons={true}
          />
        </div>
      ));
    }

    return (
      <div style={{ color: "white", textAlign: "center" }}>
        There are no tasks found.
      </div>
    );
  };

  renderModal = () => {
    if (this.state.modalsOpened.deleteAll) {
      return (
        <Modal
          backdropClass={this.state.backdropClass || null}
          sectionId="delete-all-due-today-content"
          content={() => (
            <DeleteAll
              itemName="today's tasks"
              dataObject={this.props.dueToday}
              onClose={() => {
                this.dismissModalHandler();
              }}
              deleteFunction={async () => {
                const tasks = this.props.dueToday;
                const deleteAllDueTodayTasks = async () => {
                  for (let task of tasks) {
                    await this.props.deleteTask(task.projectId, task.id);
                    // this.props.deleteFinishedTask(task.id);
                  }
                };
                await deleteAllDueTodayTasks();
                await this.props.deleteAllDueTodayTasks();
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
    return (
      <React.Fragment>
        <div data-test="component-tasks" className="tasks-container">
          <div id="tasks-list" className="todolist ui segment">
            <div className="ui relaxed divided list">
              <div className="task item list-header first">
                <div className="task content">
                  <div className="header header-text task">DUE TODAY</div>
                </div>
                <div style={{ width: "6rem" }}>
                  <button
                    onClick={e => {
                      this.onModalOpen("deleteAll");
                      console.log("Modal is open");
                    }}
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

const mapStateToProps = state => {
  return { dueToday: state.dueToday };
};

export default connect(
  mapStateToProps,
  {
    fetchDueToday,
    deleteTask,
    deleteAllDueTodayTasks
  }
)(DueToday);
