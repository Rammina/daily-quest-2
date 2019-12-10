import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TaskItem from "../TaskItem/TaskItem.js";
import Modal from "../Modal/Modal";
import { fetchDueToday } from "../../actions";
import { ellipsifyString } from "../../helpers/index.js";

class DueToday extends React.Component {
  state = {
    modalsOpened: {
      any: false,
      details: false
    },
    selectedTask: null
  };

  componentDidMount() {
    // This should call fetch due today
    this.props.fetchDueToday();
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
            // hideTime={true}
            // Find a way to make checkbox toggle work
            hideCheckbox={true}
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
  return { dueToday: state.dueToday };
};

export default connect(
  mapStateToProps,
  {
    fetchDueToday
    // fetchProject
  }
)(DueToday);
