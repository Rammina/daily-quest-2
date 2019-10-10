import './Home.css';

import React from 'react';

class Home extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<div data-test="component-home" className="home-container">
				<div className="home-welcome ui segment">
					<p>Hellllllllllo</p>
				</div>
			</div>
		);
	}
}

export default Home;
