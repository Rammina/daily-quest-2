import "./ProjectItem.css";

import React from "react";
import { connect } from "react-redux";
import Modal from '../Modal/Modal';

class ProjectItem extends React.Component {
  state={
    modalOpened: false,
    editModalOpened: false,
    deleteModalOpened: false
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

  onModalOpen = (target) =>{
    if(target.classList.contains('edit-button')) {    
      if(!this.state.editModalOpened) {      
        this.setState({editModalOpened: true});
      }
    }
    else if(target.classList.contains('delete-button')) {    
      else if(!this.state.deleteModalOpened) {              
        this.setState({deleteModalOpened: true});
      }
    }
    return null;
  }

  renderModal = () =>{
    if(this.state.editModalOpened) {      
      return (
        <Modal 
          title="Edit Project"
          content={}
          action={}
          onDismiss={}
        />
      );
    }
    else if(this.state.deleteModalOpened) {              
      return (
        <Modal 
          title="Delete Project"
          content={}
          action={}
          onDismiss={}
        />
      );
    }
    return null;
  }

  dismissModalHandler = () =>{
    this.setState({
      modalOpened: false,
      editModalOpened: false,
      deleteModalOpened: false
    })
  }

  onButtonClick = (event) =>{    
    event.stopPropagation();
    const target = event.target;    
    this.onModalOpen(target);
  }

  render() {
    const modalContent = this.renderModal();

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
      {modalContent}
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
