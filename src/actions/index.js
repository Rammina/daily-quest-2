import firebasedatabase from "../apis/firebasedatabase";
import history from "../history";

// List of action types be used
export const actionTypes = {
  FETCH_PROJECTS: "FETCH_PROJECTS",
  FETCH_PROJECT: "FETCH_PROJECT",
  CREATE_PROJECT: "CREATE_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT"
};

export const fetchProjects = () => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.get("/projects.json");
    console.log(response.data);
    dispatch({
      type: actionTypes.FETCH_PROJECTS,
      payload: response.data
    });
  };
};

export const fetchProject = id => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.get(`/projects/${id}.json`);
    dispatch({
      type: actionTypes.FETCH_PROJECT,
      payload: response.data
    });
  };
};

export const createProject = formValues => {
  console.log(formValues);
  return async function(dispatch, getState) {
    const response = await firebasedatabase.post("/projects.json", formValues);
    console.log(response.data);
    dispatch({
      type: actionTypes.CREATE_PROJECT,
      payload: formValues
    });
  };
};

export const editProject = (id, formValues) => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.patch(
      `/projects/${id}.json`,
      formValues
    );
    dispatch({
      type: actionTypes.EDIT_PROJECT,
      payload: { ...response.data, id }
    });
  };
};

export const deleteProject = id => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.delete(`/projects/${id}.json`);
    dispatch({
      type: actionTypes.DELETE_PROJECT,
      payload: id
    });
  };
};

export const createTask = (projectId, formValues) => {
  return async function(dispatch, getState) {
    // Under construction
    // const response = firebasedatabase.push(``, {...formValues, });
    dispatch({
      type: actionTypes.CREATE_TASK
      // payload: response.data
    });
  };
};
