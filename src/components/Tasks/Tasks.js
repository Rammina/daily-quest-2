import React from "react";
import { connect } from "react-redux";
import { fetchProject } from "../../actions";

class Tasks extends React.Component {
  componentDidMount() {
    this.props.fetchProject(this.props.match.params.id);
  }

  renderTasks = () =>{
    if (this.props.selectedProject) {
      const { tasks } = this.props.selectedProject;
      return tasks.map((task, index) => {
        return (
          <div
            className="item list-header"
          	key={index}
          >
            <div className="content">
              <div className="description-text">
                task.taskName
              </div>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    console.log(this.props.match.params.id);
    return <div data-test="component-tasks">Tasks</div>;
  }
}

const mapStateToProps = state => {
  return { selectedProject: state.selectedProject };
};

export default connect(
  mapStateToProps,
  { fetchProject }
)(Tasks);
