import firebasedatabase from "../apis/firebasedatabase";

export const actionTypes = {
  FETCH_PROJECTS: "FETCH_PROJECTS",
  FETCH_PROJECT: "FETCH_PROJECT"
};

export const fetchProjects = () => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.get("/projects.json");
    
    console.log(" finished getting: ");
    console.log(response.data);
    dispatch({
      type: actionTypes.FETCH_PROJECTS,
      payload: response.data
    });
  };
};

export const fetchProject = (id) => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.get(`/projects/${id}.json`);
    
    console.log(" finished getting: ");
    console.log(response.data);
    dispatch({
      type: actionTypes.FETCH_PROJECT,
      payload: response.data
    });
  };
};