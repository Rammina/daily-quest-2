import _ from "lodash";
import firebaseDbRest from "../apis/firebaseDbRest";
import { compareValues, objectToArray } from "../helpers";
import isToday from "date-fns/isToday";
// import history from "../history";

// List of action types to be used
export const actionTypes = {
  // Project actions
  FETCH_PROJECTS: "FETCH_PROJECTS",
  FETCH_PROJECT: "FETCH_PROJECT",
  CREATE_PROJECT: "CREATE_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  DELETE_ALL_PROJECTS: "DELETE_ALL_PROJECTS",
  //   sorting functions for projects
  SORT_PROJECTS_BY_NAME: "SORT_PROJECTS_BY_NAME",
  // TASK ACTIONS
  CREATE_TASK: "CREATE_TASK",
  EDIT_TASK: "EDIT_TASK",
  TOGGLE_TASK_CHECK: "TOGGLE_TASK_CHECK",
  DELETE_TASK: "DELETE_TASK",
  DELETE_ALL_TASKS: "DELETE_ALL_TASKS",
  // Finished task actions
  FETCH_FINISHED_TASKS: "FETCH_FINISHED_TASKS",
  DELETE_FINISHED_TASK: "DELETE_FINISHED_TASK",
  DELETE_ALL_FINISHED_TASKS: "DELETE_ALL_FINISHED_TASKS",
  // due today actions
  FETCH_DUE_TODAY: "FETCH_DUE_TODAY",
  DELETE_DUE_TODAY_TASK: "DELETE_DUE_TODAY_TASK",
  EDIT_DUE_TODAY_TASK: "EDIT_DUE_TODAY_TASK",
  TOGGLE_DUE_TODAY_TASK_CHECK: "TOGGLE_DUE_TODAY_TASK_CHECK",
  DELETE_ALL_DUE_TODAY_TASKS: "DELETE_ALL_DUE_TODAY_TASKS"
};

// project action creators
export const fetchProjects = () => {
  return async function(dispatch, getState) {
    const response = await firebaseDbRest.get("/projects.json");

    // remove the sort-related properties
    const dataItemsOnly = _.omit({ ...response.data }, ["sortBy"]);

    // Assign the response values to variables and do some processing
    let data = objectToArray(dataItemsOnly, "id");
    const sortBy = response.data.sortBy ? response.data.sortBy : false;
    console.log(response.data);
    console.log(sortBy.name);

    if (sortBy.name) {
      if (sortBy.name === "ascending") {
        data = data.sort(compareValues("name"));
      } else if (sortBy.name === "descending") {
        data = data.sort(compareValues("name")).reverse();
      }
    } else if (sortBy.tasks) {
      if (sortBy.tasks === "ascending") {
        // data = data.sort(compareValues("name"));
        // I'm still not sure how to sort numbers
      } else if (sortBy.tasks === "descending") {
        // data = data.sort(compareValues("name")).reverse();
      }
    }

    dispatch({
      type: actionTypes.FETCH_PROJECTS,
      payload: data
    });
  };
};

export const fetchProject = id => {
  return async function(dispatch, getState) {
    const response = await firebaseDbRest.get(`/projects/${id}.json`);
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
    const response = await firebaseDbRest.post("/projects.json", formValues);

    console.log(response.data);
    const valuesWithId = [{ ...formValues, id: response.data.name }];
    dispatch({
      type: actionTypes.CREATE_PROJECT,
      payload: valuesWithId
    });
  };
};

export const editProject = (id, formValues) => {
  return async function(dispatch, getState) {
    const response = await firebaseDbRest.patch(
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
    await firebaseDbRest.delete(`/projects/${id}.json`);

    dispatch({
      type: actionTypes.DELETE_PROJECT,
      payload: id
    });
  };
};
export const deleteAllProjects = () => {
  return async function(dispatch, getState) {
    await firebaseDbRest.delete(`/projects.json`);
    dispatch({
      type: actionTypes.DELETE_ALL_PROJECTS
    });
  };
};
// SORT PROJECT FUNCTIONS

export const sortProjectsByName = (projects, order = "ascending") => {
  // projects - array/object containing Projects
  // order - string - which can have the value of either "ascending" or "descending"
  return async function(dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(projects) && typeof projects === "object") {
      projects = objectToArray(projects);
    }
    // Perform sorting by name
    let sortedProjects = projects.sort(compareValues("name"));

    if (order === "descending") {
      // reverse the order and then save the sort setting in the database
      sortedProjects.reverse();
      await firebaseDbRest.patch("projects/sortBy.json", {
        name: "descending"
      });
    } else {
      // save the sort setting in the database
      await firebaseDbRest.patch("projects/sortBy.json", {
        name: "ascending"
      });
    }
    dispatch({
      type: actionTypes.SORT_PROJECTS_BY_NAME,
      payload: sortedProjects
    });
  };
};

// task action creators
export const createTask = (id, formValues) => {
  return async function(dispatch, getState) {
    const response = await firebaseDbRest.post(
      `/projects/${id}/tasks.json`,
      formValues
    );

    const valuesWithId = { ...formValues, id: response.data.name };
    console.log(valuesWithId);
    dispatch({
      type: actionTypes.CREATE_TASK,
      payload: valuesWithId
    });
  };
};

export const editTask = (projectId, taskId, formValues) => {
  return async function(dispatch, getState) {
    const response = await firebaseDbRest.patch(
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
    const response = await firebaseDbRest.patch(
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
    await firebaseDbRest.delete(`/projects/${projectId}/tasks/${taskId}.json`);
    dispatch({
      type: actionTypes.DELETE_TASK,
      payload: taskId
    });
  };
};

export const deleteAllTasks = projectId => {
  return async function(dispatch, getState) {
    await firebaseDbRest.delete(`/projects/${projectId}/tasks.json`);
    dispatch({
      type: actionTypes.DELETE_ALL_TASKS
    });
  };
};

// finished tasks action creators
export const fetchFinishedTasks = () => {
  return async function(dispatch, getState) {
    // Retrieve all projects first from the database
    const response = await firebaseDbRest.get("/projects.json");

    const projects = response.data;
    let finishedTasks = [];
    console.log(projects);
    // Process each project and retrieve each task
    // First check that the project contains a task to avoid undefined errors
    for (let projectKey in projects) {
      if (projects.hasOwnProperty(projectKey)) {
        if (projects[projectKey].tasks) {
          console.log(projects[projectKey].tasks);
          const tasks = projects[projectKey].tasks;
          // Check each task and retrieve only those that have finished as true
          for (let taskKey in tasks) {
            if (tasks.hasOwnProperty(taskKey) && tasks[taskKey].finished) {
              console.log(tasks[taskKey].finished);
              tasks[taskKey].id = taskKey;
              tasks[taskKey].projectId = projectKey;
              tasks[taskKey].projectName = projects[projectKey].name;
              finishedTasks = [...finishedTasks, tasks[taskKey]];
            }
          }
        }
      }
    }

    // Sort the array items
    const sortedFinishedTasks = finishedTasks.sort(compareValues("name"));
    console.log(sortedFinishedTasks);
    dispatch({
      type: actionTypes.FETCH_FINISHED_TASKS,
      payload: sortedFinishedTasks
    });
  };
};

export const deleteFinishedTask = taskIndex => {
  console.log(taskIndex);
  return async function(dispatch, getState) {
    dispatch({
      type: actionTypes.DELETE_FINISHED_TASK,
      payload: taskIndex
    });
  };
};

export const deleteAllFinishedTasks = () => {
  return async function(dispatch, getState) {
    dispatch({
      type: actionTypes.DELETE_ALL_FINISHED_TASKS
    });
  };
};

export const fetchDueToday = () => {
  return async function(dispatch, getState) {
    // Retrieve all projects first from the database
    const response = await firebaseDbRest.get("/projects.json");

    const projects = response.data;
    let dueToday = [];
    console.log(projects);
    // Process each project and retrieve each task
    // First check that the project contains a task to avoid undefined errors
    for (let projectKey in projects) {
      if (projects.hasOwnProperty(projectKey)) {
        if (projects[projectKey].tasks) {
          console.log(projects[projectKey].tasks);
          const tasks = projects[projectKey].tasks;
          // Check each task and retrieve only those that have
          // today as their deadline
          for (let taskKey in tasks) {
            if (
              tasks.hasOwnProperty(taskKey) &&
              isToday(new Date(tasks[taskKey].date.replace(/-/g, "/")))
            ) {
              console.log(tasks[taskKey].date);
              tasks[taskKey].id = taskKey;
              tasks[taskKey].projectId = projectKey;
              tasks[taskKey].projectName = projects[projectKey].name;
              dueToday = [...dueToday, tasks[taskKey]];
            }
          }
        }
      }
    }
    // Sort the array items
    console.log(dueToday);
    const sortedDueToday = dueToday.sort(compareValues("name"));
    console.log(sortedDueToday);
    dispatch({
      type: actionTypes.FETCH_DUE_TODAY,
      payload: sortedDueToday
    });
  };
};

export const deleteDueTodayTask = taskIndex => {
  return async function(dispatch, getState) {
    dispatch({
      type: actionTypes.DELETE_DUE_TODAY_TASK,
      payload: taskIndex
    });
  };
};

export const editDueTodayTask = (taskIndex, formValues) => {
  return async function(dispatch, getState) {
    if (!isToday(formValues.date)) {
      dispatch({
        type: actionTypes.DELETE_DUE_TODAY_TASK,
        payload: taskIndex
      });
    } else {
      dispatch({
        type: actionTypes.EDIT_DUE_TODAY_TASK,
        payload: { ...{ ...formValues }, taskIndex }
      });
    }
  };
};

export const toggleDueTodayTaskCheck = (taskIndex, checkValue) => {
  return async function(dispatch, getState) {
    dispatch({
      type: actionTypes.TOGGLE_DUE_TODAY_TASK_CHECK,
      payload: { checkValue, taskIndex }
    });
  };
};

export const deleteAllDueTodayTasks = () => {
  return async function(dispatch, getState) {
    dispatch({
      type: actionTypes.DELETE_ALL_DUE_TODAY_TASKS
    });
  };
};
