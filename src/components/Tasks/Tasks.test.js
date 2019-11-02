import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

import { findByTestAttributes } from '../../test/testUtils';

import Tasks from './Tasks';

global.window = { location: { pathname: null }}

const setup = (props = {}, state = null) => {
	return shallow(<Tasks {...props} />);
};

test('component renders without error', () => {
	const wrapper = setup();
	const tasksComponent = findByTestAttributes(wrapper, 'component-tasks');
	expect(tasksComponent.length).toBe(1);
});

