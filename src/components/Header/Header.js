// import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

import NavMenu from '../NavMenu/NavMenu';

class Header extends React.Component {
	componentDidMount() {}		

	render() {
		return (
			<div data-test="component-header" className="ui secondary pointing menu header">
				<Link data-test="home-link" to="/" className="item">Daily Quest</Link>
				<NavMenu />
			</div>
		);
	}
}

export default Header;
