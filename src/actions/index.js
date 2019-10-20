import firebasedatabase from "../apis/firebasedatabase";

// List of action types be used
export const actionTypes = {
  FETCH_PROJECTS: "FETCH_PROJECTS",
  FETCH_PROJECT: "FETCH_PROJECT",
  CREATE_PROJECT: "CREATE_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
};

export const fetchProjects = () => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.get("/projects.json");
    dispatch({
      type: actionTypes.FETCH_PROJECTS,
      payload: response.data
    });
  };
};

export const fetchProject = (id) => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.get(`/projects/${id}.json`);
    dispatch({
      type: actionTypes.FETCH_PROJECT,
      payload: response.data
    });
  };
};

export const createProject = (formValues) => {
	return async function(dispatch, getState) {
		const response = firebasedatabase.post('/projects.json', formValues);
		dispatch({
			type: actionTypes.CREATE_PROJECT,
			payload: response.data
		})
	};
}

export const editProject = (id, formValues) => {
	return async function(dispatch, getState) {
		const response = firebasedatabase.patch(`/projects/${id}.json`, formValues);
		dispatch({
			type: actionTypes.EDIT_PROJECT,
			payload: response.data
		})
	};
}	

export const deleteProject = (id) => {
	return async function(dispatch, getState) {
		const response = firebasedatabase.delete(`/projects/${id}.json`);
		dispatch({
			type: actionTypes.DELETE_PROJECT,			
			payload: id
		})
	};
}