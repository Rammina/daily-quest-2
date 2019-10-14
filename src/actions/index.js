import firebasedatabase from "../apis/firebasedatabase";

export const actionTypes = {
  FETCH_PROJECTS: "FETCH_PROJECTS"
};

export const fetchProjects = () => {
  return async function(dispatch, getState) {
    const response = await firebasedatabase.get("/projects.json");

    // under construction because I have to sort out the data
    console.log(" finished getting: ");
    console.log(response.data);
    dispatch({
      type: actionTypes.FETCH_PROJECTS,
      payload: response.data
    });
  };
};
