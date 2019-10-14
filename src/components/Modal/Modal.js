import React from "react";
import ReactDOM from 'react-dom';
import history from '../../history';

const Modal = (props) =>{
	return ReactDOM.createPortal(
		<div onClick={}> to be constructed </div>,
		document.getElementById("modal")
	);
}

export default Modal;