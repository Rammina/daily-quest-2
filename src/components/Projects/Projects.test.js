import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

import { findByTestAttributes } from '../../test/testUtils';

import Projects from './Projects';

const setup = (props = {}, state = null) => {
	return shallow(<Projects {...props} />);
};

test('component renders without error', () => {
	const wrapper = setup();
	const projectsComponent = findByTestAttributes(wrapper, 'component-projects');
	expect(projectsComponent.length).toBe(1);
});
