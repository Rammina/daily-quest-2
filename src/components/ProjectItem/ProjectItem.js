import "./ProjectItem.css";

import React from "react";
import { connect } from "react-redux";

class ProjectItem extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div
        className="item list-header"
        key={`${this.props.project.name}-${this.props.project.id}`}
      >
        <div className="content">
          <div className="description-text project">
            {this.props.project.name}
          </div>
        </div>
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
