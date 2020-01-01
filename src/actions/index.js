import _ from "lodash";
import firebaseDbRest from "../apis/firebaseDbRest";
import {
  compareValues,
  comparePriorityValues,
  compareKeysInProp,
  objectToArray
} from "../helpers";
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
  SORT_PROJECTS_BY_TASKS: "SORT_PROJECTS_BY_TASKS",

  // TASK ACTIONS
  CREATE_TASK: "CREATE_TASK",
  EDIT_TASK: "EDIT_TASK",
  TOGGLE_TASK_CHECK: "TOGGLE_TASK_CHECK",
  DELETE_TASK: "DELETE_TASK",
  DELETE_ALL_TASKS: "DELETE_ALL_TASKS",
  //    sorting functions for Tasks
  SORT_TASKS_BY_NAME: "SORT_TASKS_BY_NAME",
  SORT_TASKS_BY_DATE: "SORT_TASKS_BY_DATE",
  SORT_TASKS_BY_PRIORITY: "SORT_TASKS_BY_PRIORITY",
  // Finished task actions
  FETCH_FINISHED_TASKS: "FETCH_FINISHED_TASKS",
  DELETE_FINISHED_TASK: "DELETE_FINISHED_TASK",
  DELETE_ALL_FINISHED_TASKS: "DELETE_ALL_FINISHED_TASKS",
  // sort functions for finished tasks
  SORT_FINISHED_TASKS_BY_NAME: "SORT_FINISHED_TASKS_BY_NAME",
  SORT_FINISHED_TASKS_BY_DATE: "SORT_FINISHED_TASKS_BY_DATE",
  SORT_FINISHED_TASKS_BY_PRIORITY: "SORT_FINISHED_TASKS_BY_PRIORITY",

  // due today actions
  FETCH_DUE_TODAY: "FETCH_DUE_TODAY",
  DELETE_DUE_TODAY_TASK: "DELETE_DUE_TODAY_TASK",
  EDIT_DUE_TODAY_TASK: "EDIT_DUE_TODAY_TASK",
  TOGGLE_DUE_TODAY_TASK_CHECK: "TOGGLE_DUE_TODAY_TASK_CHECK",
  DELETE_ALL_DUE_TODAY_TASKS: "DELETE_ALL_DUE_TODAY_TASKS",
  // sort action creators for due today
  SORT_DUE_TODAY_TASKS_BY_NAME: "SORT_DUE_TODAY_TASKS_BY_NAME"
};

// project action creators
export const fetchProjects = () => {
  return async function(dispatch, getState) {
    const response = await firebaseDbRest.get("/projects.json");
    let data = null;
    if (response.data) {
      // remove the sort-related properties
      const dataItemsOnly = _.omit({ ...response.data }, [
        "sortBy",
        "finishedSortBy",
        "dueTodaySortBy"
      ]);

      // Assign the response values to variables and do some processing
      data = objectToArray(dataItemsOnly, "id");
      const sortBy = response.data.sortBy ? response.data.sortBy : false;

      // sortby property and check whether it is ascending or descending
      if (sortBy.name) {
        if (sortBy.name === "ascending") {
          data = data.sort(compareValues("name"));
        } else if (sortBy.name === "descending") {
          data = data.sort(compareValues("name", "desc"));
        }
      } else if (sortBy.tasks) {
        if (sortBy.tasks === "ascending") {
          data = data.sort((a, b) => compareKeysInProp(a, b, "tasks"));
        } else if (sortBy.tasks === "descending") {
          data = data
            .sort((a, b) => compareKeysInProp(a, b, "tasks"))
            .reverse();
        }
      }

      dispatch({
        type: actionTypes.FETCH_PROJECTS,
        payload: response.data ? data : response.data
      });
    }
  };
};

export const fetchProject = id => {
  return async function(dispatch, getState) {
    const response = await firebaseDbRest.get(`/projects/${id}.json`);
    const valuesWithId = { ...response.data, id };

    let data = objectToArray(
      // remove the sort-related properties
      _.omit({ ...valuesWithId.tasks }, ["sortBy"]),
      "id"
    );

    const sortBy = response.data.sortBy ? response.data.sortBy : false;

    // sortby property and check whether it is ascending or descending
    if (sortBy.name) {
      if (sortBy.name === "ascending") {
        data = data.sort(compareValues("name"));
      } else if (sortBy.name === "descending") {
        data = data.sort(compareValues("name", "desc"));
      }
    } else if (sortBy.date) {
      if (sortBy.date === "ascending") {
        data = data.sort(compareValues("date"));
      } else if (sortBy.date === "descending") {
        data = data.sort(compareValues("date", "desc"));
      }
    } else if (sortBy.priority) {
      if (sortBy.priority === "ascending") {
        data = data.sort(comparePriorityValues());
      } else if (sortBy.priority === "descending") {
        data = data.sort(comparePriorityValues("desc"));
      }
    }
    const projectWithArrayTasks = {
      ...valuesWithId,
      tasks: data
    };
    dispatch({
      type: actionTypes.FETCH_PROJECT,
      payload: projectWithArrayTasks
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
      await firebaseDbRest.put("projects/sortBy.json", {
        name: "descending"
      });
    } else {
      // save the sort setting in the database
      await firebaseDbRest.put("projects/sortBy.json", {
        name: "ascending"
      });
    }
    dispatch({
      type: actionTypes.SORT_PROJECTS_BY_NAME,
      payload: sortedProjects
    });
  };
};

export const sortProjectsByTasks = (projects, order = "ascending") => {
  // projects - array/object containing Projects
  // order - string - which can have the value of either "ascending" or "descending"
  return async function(dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(projects) && typeof projects === "object") {
      projects = objectToArray(projects);
    }
    // Perform sorting by task count
    let sortedProjects = projects.sort((a, b) =>
      compareKeysInProp(a, b, "tasks")
    );

    if (order === "descending") {
      // reverse the order and then save the sort setting in the database
      sortedProjects.reverse();
      await firebaseDbRest.put("projects/sortBy.json", {
        tasks: "descending"
      });
    } else {
      // save the sort setting in the database
      await firebaseDbRest.put("projects/sortBy.json", {
        tasks: "ascending"
      });
    }
    dispatch({
      type: actionTypes.SORT_PROJECTS_BY_TASKS,
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

    const valuesWithId = [{ ...formValues, id: response.data.name }];
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
    console.log(checkValue);
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

// Sort task action creators here
export const sortTasksByName = (tasks, projectId, order = "ascending") => {
  // tasks - array/object containing tasks
  // projectId - string that indicates the id of the project
  // order - string - which can have the value of either "ascending" or "descending"
  return async function(dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // Perform sorting by name
    console.log(tasks);
    let sortedTasks = [...tasks.sort(compareValues("name"))];

    if (order === "descending") {
      // reverse the order and then save the sort setting in the database

      await firebaseDbRest.put(`projects/${projectId}/sortBy.json`, {
        name: "descending"
      });
      sortedTasks.reverse();
    } else {
      // save the sort setting in the database
      await firebaseDbRest.put(`projects/${projectId}/sortBy.json`, {
        name: "ascending"
      });
    }
    console.log(sortedTasks);
    dispatch({
      type: actionTypes.SORT_TASKS_BY_NAME,
      payload: sortedTasks
    });
  };
};

export const sortTasksByDate = (tasks, projectId, order = "ascending") => {
  // tasks - array/object containing tasks
  // projectId - string that indicates the id of the project
  // order - string - which can have the value of either "ascending" or "descending"
  return async function(dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // Perform sorting by date
    console.log(tasks);
    let sortedTasks = [...tasks.sort(compareValues("date"))];

    if (order === "descending") {
      // reverse the order and then save the sort setting in the database

      await firebaseDbRest.put(`projects/${projectId}/sortBy.json`, {
        name: "descending"
      });
      sortedTasks.reverse();
    } else {
      // save the sort setting in the database
      await firebaseDbRest.put(`projects/${projectId}/sortBy.json`, {
        name: "ascending"
      });
    }
    console.log(sortedTasks);
    dispatch({
      type: actionTypes.SORT_TASKS_BY_DATE,
      payload: sortedTasks
    });
  };
};

export const sortTasksByPriority = (tasks, projectId, order = "ascending") => {
  // tasks - array/object containing tasks
  // projectId - string that indicates the id of the project
  // order - string - which can have the value of either "ascending" or "descending"
  return async function(dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // Perform sorting by priority
    console.log(tasks);
    let sortedTasks = [];

    if (order === "descending") {
      // sort by priority descending, save the setting to database
      await firebaseDbRest.put(`projects/${projectId}/sortBy.json`, {
        priority: "descending"
      });
      sortedTasks = [...tasks.sort(comparePriorityValues("desc"))];
    } else {
      // save the sort setting in the database
      await firebaseDbRest.put(`projects/${projectId}/sortBy.json`, {
        priority: "ascending"
      });
      // sort by priority ascending
      sortedTasks = [...tasks.sort(comparePriorityValues())];
    }
    console.log(sortedTasks);
    dispatch({
      type: actionTypes.SORT_TASKS_BY_PRIORITY,
      payload: sortedTasks
    });
  };
};
// finished tasks action creators
export const fetchFinishedTasks = () => {
  return async function(dispatch, getState) {
    // Retrieve all projects first from the database
    const response = await firebaseDbRest.get("/projects.json");

    // get rid of the sortBy property so it is not included in the data
    const projects = _.omit({ ...response.data }, [
      "finishedSortBy",
      "sortBy",
      "dueTodaySortBy"
    ]);

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

    // Guards against undefined errors
    const sortBy = response.data.finishedSortBy
      ? response.data.finishedSortBy
      : false;

    // finishedSortBy property and check whether it is ascending or descending
    if (sortBy.name) {
      if (sortBy.name === "ascending") {
        finishedTasks = finishedTasks.sort(compareValues("name"));
      } else if (sortBy.name === "descending") {
        finishedTasks = finishedTasks.sort(compareValues("name", "desc"));
      }
    }

    console.log(finishedTasks);
    dispatch({
      type: actionTypes.FETCH_FINISHED_TASKS,
      payload: finishedTasks
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

// SORT FINISHED TASKS FUNCTIONS
export const sortFinishedTasksByName = (tasks, order = "ascending") => {
  // tasks - array/object containing finished tasks
  // order - string - which can have the value of either "ascending" or "descending"
  return async function(dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // Perform sorting by name
    let sortedTasks = tasks.sort(compareValues("name"));

    if (order === "descending") {
      // reverse the order and then save the sort setting in the database
      sortedTasks.reverse();
      await firebaseDbRest.put("projects/finishedSortBy.json", {
        name: "descending"
      });
    } else {
      // save the sort setting in the database
      await firebaseDbRest.put("projects/finishedSortBy.json", {
        name: "ascending"
      });
    }
    dispatch({
      type: actionTypes.SORT_FINISHED_TASKS_BY_NAME,
      payload: sortedTasks
    });
  };
};

export const sortFinishedTasksByDate = (tasks, order = "ascending") => {
  // tasks - array/object containing tasks
  // order - string - which can have the value of either "ascending" or "descending"

  return async function(dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // save the order's setting in the database
    await firebaseDbRest.put("projects/finishedSortBy.json", {
      date: order
    });
    // Perform sorting by date
    let sortedTasks = null;
    if (order === "descending") {
      // sort in descending order
      sortedTasks = tasks.sort(compareValues("date", "desc"));
    } else {
      // sort in ascending order
      sortedTasks = tasks.sort(compareValues("date"));
    }
    dispatch({
      type: actionTypes.SORT_FINISHED_TASKS_BY_DATE,
      payload: sortedTasks
    });
  };
};

export const sortFinishedTasksByPriority = (tasks, order = "ascending") => {
  // tasks - array/object containing tasks
  // order - string - which can have the value of either "ascending" or "descending"

  return async function(dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // save the order's setting in the database
    await firebaseDbRest.put("projects/finishedSortBy.json", {
      priority: order
    });
    // Perform sorting by date
    let sortedTasks = null;
    if (order === "descending") {
      // sort in descending order
      sortedTasks = tasks.sort(comparePriorityValues("desc"));
    } else {
      // sort in ascending order
      sortedTasks = tasks.sort(comparePriorityValues());
    }
    dispatch({
      type: actionTypes.SORT_FINISHED_TASKS_BY_PRIORITY,
      payload: sortedTasks
    });
  };
};

// DUETODAY TASKS ACTION CREATORS
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
            if (tasks.hasOwnProperty(taskKey) && tasks[taskKey].date) {
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
    }

    // Guards against undefined errors
    const sortBy = response.data.dueTodaySortBy
      ? response.data.dueTodaySortBy
      : false;

    // dueTodaySortBy property and check whether it is ascending or descending
    if (sortBy.name) {
      if (sortBy.name === "ascending") {
        dueToday = dueToday.sort(compareValues("name"));
      } else if (sortBy.name === "descending") {
        dueToday = dueToday.sort(compareValues("name", "desc"));
      }
    }

    dispatch({
      type: actionTypes.FETCH_DUE_TODAY,
      payload: dueToday
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

// SORT DUETODAY TASKS FUNCTIONS
export const sortDueTodayTasksByName = (tasks, order = "ascending") => {
  // tasks - array/object containing finished tasks
  // order - string - which can have the value of either "ascending" or "descending"
  return async function(dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // Perform sorting by name
    let sortedTasks = tasks.sort(compareValues("name"));

    if (order === "descending") {
      // reverse the order and then save the sort setting in the database
      sortedTasks.reverse();
      await firebaseDbRest.put("projects/dueTodaySortBy.json", {
        name: "descending"
      });
    } else {
      // save the sort setting in the database
      await firebaseDbRest.put("projects/dueTodaySortBy.json", {
        name: "ascending"
      });
    }
    dispatch({
      type: actionTypes.SORT_DUE_TODAY_TASKS_BY_NAME,
      payload: sortedTasks
    });
  };
};
