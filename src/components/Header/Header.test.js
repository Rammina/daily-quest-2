import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

import { findByTestAttributes } from '../../test/testUtils';

import Header from './Header';

const setup = (props = {}, state = null) => {
	const wrapper = shallow(<Header {...props} />);
	if(state) {wrapper.setState(state)}; 
	return wrapper;
};

test('component renders without error', () => {
	const wrapper = setup();
	const headerComponent = findByTestAttributes(wrapper, 'component-header');
	expect(headerComponent.length).toBe(1);
});

test('renders a link to the homepage of the application', () => {
	const wrapper = setup();
	const link = wrapper.find('[data-test="home-link"][to="/"]');
	expect(link.length).toBe(1);
});

test('renders a hamburger button', () =>{
	const wrapper = setup();
	const hamburger = findByTestAttributes(wrapper, 'nav-hamburger');
	expect(hamburger.length).toBe(1);
})

test('clicking the hamburger button toggles sidebar class', () =>{
	const wrapper = setup();
	const initialSidebarClass = wrapper.state('sidebarClassFromClick');
	
	const hamburger = findByTestAttributes(wrapper, 'nav-hamburger');
	hamburger.simulate('click');
	wrapper.update();

	const currentSidebarClass = wrapper.state('sidebarClassFromClick');
	expect(currentSidebarClass).not.toBe(initialSidebarClass);

})



// test('Clicking the link should change the address bar URL to "/"', () =>{
// 	const wrapper = setup();
// 	const link = findByTestAttributes(wrapper, 'home-link');
// 	link.simulate('click');
// 	expect(global.window.location.pathname).toBe("/");
// })
