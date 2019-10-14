import "./ProjectItem.css";

import React from "react";
import { connect } from "react-redux";
import Modal from '../Modal/Modal';

class ProjectItem extends React.Component {
  state={
    modalOpened: false
  }
  componentDidMount() {

  };

  editContent = () =>{
    // Insert content here For the edit modal
    return (

    );
  }

  editActions = () =>{

    return (

    );
  }

  renderModal = (target) =>{
    if(target.classList.contains('edit-button')) {    
      if(!this.state.modalOpened) {
        this.setState({modalOpened: true})
      }      
      return (
        <Modal 
          title="Edit Project"
          content={}
          action={}
        />
      );
    }
    else if(target.classList.contains('delete-button')) {
      if(!this.state.modalOpened) {
        this.setState({modalOpened: true})
      }
      return (
        <Modal 
          title="Delete Project"
          content={}
          action={}
        />
      );
    }

    return null;
  }

  onButtonClick = (event) =>{    
    event.stopPropagation();
    const target = event.target;
    this.renderModal(target);
  }

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
          <button onClick={this.onButtonClick} className="project edit-button">edit</button>
          <button onClick={this.onButtonClick} className="project delete-button">delete</button>
        </div>
      </div>
      {this.renderModal()}
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
