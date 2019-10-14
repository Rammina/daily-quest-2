import { actionTypes } from '../actions';

export default (state = [], action) => {
	switch (action.type) {
		case actionTypes.FETCH_PROJECT:
			return action.payload;
		default:
			return state;
	}
}