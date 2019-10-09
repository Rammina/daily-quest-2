import './App.css';

import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import Header from './Header/Header';
import Home from './Home/Home';
import Projects from './Projects/Projects';
import Tasks from './Tasks/Tasks';

class App extends React.Component {
	render() {
		return (
			<div data-test="component-app" className="ui container">
				<Router history={history}>
					<div>
						<Header />
						<Route path="/" exact component={Home} />
						<Route path="/projects" exact component={Projects} />
						<Route path="/projects:id" exact component={Tasks} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
