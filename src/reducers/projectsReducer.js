import { actionTypes } from '../actions';

export default (state = [], action) => {
	switch (action.type) {
		case actionTypes.FETCH_PROJECTS:
			return action.payload;
		default:
			return state;
	}
}