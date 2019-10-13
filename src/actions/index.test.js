import {fetchProjects, actionTypes} from './';

describe('fetchProjects', () => {
	test('returns an action with the type of "FETCH_PROJECTS"', () =>{
		const action = fetchProjects();
		expect(action).toEqual({type: actionTypes.FETCH_PROJECTS});
	})
});
