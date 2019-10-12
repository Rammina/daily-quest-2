import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

import { findByTestAttributes} from '../../test/testUtils';

import NavMenu from './NavMenu';

const setup = (props = {}, state = null) => {
	const wrapper = shallow(<NavMenu {...props} />);
	if(state) {wrapper.setState(state)}; 	
	return wrapper;
};

test('component renders without error', () => {
	const wrapper = setup();
	const navMenuComponent = findByTestAttributes(wrapper, 'component-nav-menu');
	expect(navMenuComponent.length).toBe(1);
});


test('Contains *links* to other *pages* of the application', () =>{
	const wrapper = setup();
	// const links = wrapper.find(Link);
	// expect(links.length).toBeGreaterThan(0);
})

test('clicking a *link* to a page should output the correct address bar URL', () => {
	console.log(window.location.pathname);
})




// test('menu becomes a sidebar on mobile width - < 900px-', () => {
// 	// resizeWindow(901, 899);

// 	const wrapper = setup();
// 	const navMenuComponent = findByTestAttributes(wrapper, 'component-nav-menu');
// 	expect(["ui", "inverted", "right", "vertical", "sidebar", "menu"].every(c => navMenuComponent.hasClass(c))).toBe(true);
// });
