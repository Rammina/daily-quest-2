import './NavMenu.css';

import React from 'react';
import { Link } from 'react-router-dom';

class NavMenu extends React.Component {
	state = {
		
	};

	componentDidMount() {}
		
	render() {
		return (
			<div data-test="component-nav-menu" className={`nav-menu ${this.props.menuClass} ${this.props.sidebarClassFromClick}`}>
				<p style={{ visibility: 'hidden' }}></p>
				<Link data-test="projects" to="/projects" className="left item no-border">
					Projects
				</Link>
				<Link data-test="due-today-link" to="/due-today" className="left item">
					Due Today
				</Link>
				<Link data-test="finished-tasks-link" to="/finished-tasks" className="left item">
					Finished Tasks
				</Link>
			</div>
		);
	}
}

export default NavMenu;
