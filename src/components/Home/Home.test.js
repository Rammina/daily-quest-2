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

