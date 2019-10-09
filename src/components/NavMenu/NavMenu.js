import './NavMenu.css';

import React from 'react';
import { Link } from 'react-router-dom';

class NavMenu extends React.Component {
	state = {
		menuClass: 'right menu'
	};

	renderNavMenu = () => {
		if (this.state.menuClass) {
			const menuClass =
				window.innerWidth > 900 ? 'right menu' : 'ui inverted right vertical sidebar menu';
			if (menuClass !== this.state.menuClass) {
				this.setState({ menuClass });
			}
		}
	};

	handleResize = () => {
		this.renderNavMenu();
	};

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.renderNavMenu();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		return (
			<div data-test="component-nav-menu" className={`nav-menu visible ${this.state.menuClass}`}>
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
