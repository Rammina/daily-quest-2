import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

import { findByTestAttributes } from '../test/testUtils';

import App from './App';

const setup = (props = {}, state = null) => {
	return shallow(<App {...props} />);
};

test('component renders without error', () => {
	const wrapper = setup();
	const appComponent = findByTestAttributes(wrapper, 'component-app');
	expect(appComponent.length).toBe(1);
});

