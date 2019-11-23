import firebasedatabase from "../apis/firebasedatabase";
// import history from "../history";

// List of action types to be used
export const actionTypes = {
  FETCH_PROJECTS: "FETCH_PROJECTS",
  FETCH_PROJECT: "FETCH_PROJECT",
  CREATE_PROJECT: "CREATE_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  CREATE_TASK: "CREATE_TASK",
  EDIT_TASK: "EDIT_TASK",
  TOGGLE_TASK_CHECK: "TOGGLE_TASK_CHECK",
  DELETE_TASK: "DELETE_TASK"
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

export const fetchProject = id => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.get(`/projects/${id}.json`);
    const valuesWithId = { ...response.data, id };
    dispatch({
      type: actionTypes.FETCH_PROJECT,
      payload: valuesWithId
    });
  };
};

export const createProject = formValues => {
  console.log(formValues);
  return async function(dispatch, getState) {
    const response = await firebasedatabase.post("/projects.json", formValues);
    console.log(response.data);
    const valuesWithId = { ...formValues, id: response.data.name };
    dispatch({
      type: actionTypes.CREATE_PROJECT,
      payload: valuesWithId
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
    console.log(`deleting ${id}`);
    await firebasedatabase.delete(`/projects/${id}.json`);
    dispatch({
      type: actionTypes.DELETE_PROJECT,
      payload: id
    });
  };
};
export const createTask = (id, formValues) => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.post(
      `/projects/${id}/tasks.json`,
      formValues
    );
    console.log("response from server");
    console.log(response.data);
    console.log(response.data.name);
    const valuesWithId = { ...formValues, id: response.data.name };
    dispatch({
      type: actionTypes.CREATE_TASK,
      payload: valuesWithId
    });
  };
};

export const editTask = (projectId, taskId, formValues) => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.patch(
      `/projects/${projectId}/tasks/${taskId}.json`,
      formValues
    );
    console.log(response.data);
    dispatch({
      type: actionTypes.EDIT_TASK,
      payload: { ...response.data, id: taskId }
    });
  };
};

export const toggleTaskCheck = (projectId, taskId, checkValue) => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.patch(
      `/projects/${projectId}/tasks/${taskId}.json`,
      { finished: checkValue }
    );
    console.log(response.data);
    dispatch({
      type: actionTypes.TOGGLE_TASK_CHECK,
      payload: { ...response.data, id: taskId }
    });
  };
};

export const deleteTask = (projectId, taskId) => {
  return async function(dispatch, getState) {
    console.log(`deleting ${taskId}`);
    await firebasedatabase.delete(
      `/projects/${projectId}/tasks/${taskId}.json`
    );
    dispatch({
      type: actionTypes.DELETE_TASK,
      payload: taskId
    });
  };
};
