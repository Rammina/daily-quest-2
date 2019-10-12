import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

import { findByTestAttributes } from '../../test/testUtils';

import Home from './Home';

const setup = (props = {}, state = null) => {
	return shallow(<Home {...props} />);
};

test('component renders without error', () => {
	const wrapper = setup();
	const homeComponent = findByTestAttributes(wrapper, 'component-home');
	expect(homeComponent.length).toBe(1);
});

test('renders Link to projects page', () => {
	const wrapper = setup();
	const projectLink = wrapper.find('[data-test="home-projects-link"][to="/projects"]');
	expect(projectLink.length).toBe(1);
});

test('renders Link to due today page', () => {
	const wrapper = setup();
	const dueTodayLink = wrapper.find('[data-test="home-due-today-link"][to="/due-today"]');
	expect(dueTodayLink.length).toBe(1);
});
