import firestore from "../apis/firestore";

export const actionTypes = {
	FETCH_PROJECTS: 'FETCH_PROJECTS',
};

export const fetchProjects = () => {
	return async function (dispatch, getState) {
		const response = await firestore.get('/projectA');

		console.log(response);
		dispatch({
			type: actionTypes.FETCH_PROJECTS,
			payload: response
		})
	};
}