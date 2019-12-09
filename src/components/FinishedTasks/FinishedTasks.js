import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TaskItem from "../TaskItem/TaskItem.js";
import Modal from "../Modal/Modal";
import { fetchFinishedTasks } from "../../actions";
import { ellipsifyString } from "../../helpers/index.js";

class FinishedTasks extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      details: false
    },
    selectedTask: null
  };

  componentDidMount() {
    // This should call fetch due today
    this.props.fetchFinishedTasks();
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
    const tasks = this.props.finishedTasks;
    if (tasks) {
      return tasks.map(task => (
        <div
          key={task.id}
          tabIndex="0"
          className="task item list-header task-item-details"
        >
          <TaskItem
            hideDate={true}
            hideTime={true}
            hideCheckbox={true}
            task={task}
            taskId={task.id}
            projectId={task.projectId}
            projectName={ellipsifyString(task.projectName, 13)}
            hideActionButtons={true}
          />
        </div>
      ));
    } else {
      return (
        <div style={{ color: "white", textAlign: "center" }}>
          There are no tasks found.
        </div>
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div data-test="component-tasks" className="tasks-container">
          <div id="tasks-list" className="todolist ui segment">
            <div className="ui relaxed divided list">
              <div className="task item list-header first">
                <div className="task content">
                  <div className="header header-text task">FINISHED TASKS</div>
                </div>
                <div>
                  <button
                    style={{ visibility: "hidden" }}
                    disabled={true}
                    className="create-button"
                  >
                    +
                  </button>
                </div>
              </div>
              {this.renderTasks()}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { finishedTasks: state.finishedTasks };
};

export default connect(mapStateToProps, {
  fetchFinishedTasks
  // fetchProject
})(FinishedTasks);