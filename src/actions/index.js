import _ from "lodash";
import firebaseDbRest from "../apis/firebaseDbRest";
import {
  compareValues,
  comparePriorityValues,
  compareKeysInProp,
  objectToArray,
} from "../helpers";
import isToday from "date-fns/isToday";

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
  SORT_DUE_TODAY_TASKS_BY_NAME: "SORT_DUE_TODAY_TASKS_BY_NAME",
  SORT_DUE_TODAY_TASKS_BY_DATE: "SORT_DUE_TODAY_TASKS_BY_DATE",
  SORT_DUE_TODAY_TASKS_BY_PRIORITY: "SORT_DUE_TODAY_TASKS_BY_PRIORITY",

  //GoogleAuth
  AUTH_SIGN_IN: "AUTH_SIGN_IN",
  AUTH_SIGN_OUT: "AUTH_SIGN_OUT",
};

// project action creators
export const fetchProjects = (userId) => {
  return async function (dispatch, getState) {
    const response = await firebaseDbRest.get(
      `/${userId || "guest"}/projects.json`
    );
    console.log(userId);
    console.log(response);
    console.log(response.data);
    let data = null;
    if (response.data) {
      // remove the sort-related properties
      const dataItemsOnly = _.omit({ ...response.data }, [
        "sortBy",
        "finishedSortBy",
        "dueTodaySortBy",
      ]);

      // Assign the response values to variables and do some processing
      data = objectToArray(dataItemsOnly, "id");
      const sortBy = response.data.sortBy ? response.data.sortBy : false;

      // sort by property and check whether it is ascending or descending
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
        payload: response.data ? data : response.data,
      });
    }
  };
};

export const fetchProject = (userId, id) => {
  return async function (dispatch) {
    const response = await firebaseDbRest.get(
      `/${userId || "guest"}/projects/${id}.json`
    );

    let projectWithArrayTasks = null; /*just declaring to avoid undefined*/
    if (response.data) {
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
      projectWithArrayTasks = {
        ...valuesWithId,
        tasks: data,
      };
    }
    dispatch({
      type: actionTypes.FETCH_PROJECT,
      payload: projectWithArrayTasks || null,
    });
  };
};

export const createProject = (userId, formValues) => {
  console.log(formValues);
  return async function (dispatch) {
    const response = await firebaseDbRest.post(
      `/${userId || "guest"}/projects.json`,
      formValues
    );

    console.log(response.data);
    const valuesWithId = [{ ...formValues, id: response.data.name }];
    dispatch({
      type: actionTypes.CREATE_PROJECT,
      payload: valuesWithId,
    });
  };
};

export const editProject = (userId, id, formValues) => {
  return async function (dispatch) {
    const response = await firebaseDbRest.patch(
      `/${userId || "guest"}/projects/${id}.json`,
      formValues
    );
    dispatch({
      type: actionTypes.EDIT_PROJECT,
      payload: { ...response.data, id },
    });
  };
};

export const deleteProject = (userId, id) => {
  return async function (dispatch) {
    console.log(`deleting ${id}`);
    await firebaseDbRest.delete(`/${userId || "guest"}/projects/${id}.json`);

    dispatch({
      type: actionTypes.DELETE_PROJECT,
      payload: id,
    });
  };
};

export const deleteAllProjects = (userId) => {
  return async function (dispatch) {
    await firebaseDbRest.delete(`/${userId || "guest"}/projects.json`);
    dispatch({
      type: actionTypes.DELETE_ALL_PROJECTS,
    });
  };
};

// SORT PROJECT FUNCTIONS
export const sortProjectsByName = (userId, projects, order = "ascending") => {
  // projects - array/object containing Projects
  // order - string - which can have the value of either "ascending" or "descending"
  return async function (dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(projects) && typeof projects === "object") {
      projects = objectToArray(projects);
    }
    // Perform sorting by name
    let sortedProjects = projects.sort(compareValues("name"));

    if (order === "descending") {
      // reverse the order
      sortedProjects.reverse();
    }
    // save the sort setting in the database
    await firebaseDbRest.put(`/${userId || "guest"}/projects/sortBy.json`, {
      name: order,
    });

    dispatch({
      type: actionTypes.SORT_PROJECTS_BY_NAME,
      payload: sortedProjects,
    });
  };
};

export const sortProjectsByTasks = (userId, projects, order = "ascending") => {
  // projects - array/object containing Projects
  // order - string - which can have the value of either "ascending" or "descending"
  return async function (dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(projects) && typeof projects === "object") {
      projects = objectToArray(projects);
    }
    // Perform sorting by task count
    let sortedProjects = projects.sort((a, b) =>
      compareKeysInProp(a, b, "tasks")
    );

    if (order === "descending") {
      // reverse the order
      sortedProjects.reverse();
    }
    // save the sort setting in the database
    await firebaseDbRest.put(`/${userId || "guest"}/projects/sortBy.json`, {
      tasks: order,
    });

    dispatch({
      type: actionTypes.SORT_PROJECTS_BY_TASKS,
      payload: sortedProjects,
    });
  };
};

// task action creators
export const createTask = (userId, id, formValues) => {
  return async function (dispatch) {
    const response = await firebaseDbRest.post(
      `/${userId || "guest"}/projects/${id}/tasks.json`,
      formValues
    );

    const valuesWithId = [{ ...formValues, id: response.data.name }];
    console.log(valuesWithId);
    dispatch({
      type: actionTypes.CREATE_TASK,
      payload: valuesWithId,
    });
  };
};

export const editTask = (userId, projectId, taskId, formValues) => {
  return async function (dispatch) {
    const response = await firebaseDbRest.patch(
      `/${userId || "guest"}/projects/${projectId}/tasks/${taskId}.json`,
      formValues
    );
    console.log(response.data);
    dispatch({
      type: actionTypes.EDIT_TASK,
      payload: { ...response.data, id: taskId },
    });
  };
};

export const toggleTaskCheck = (userId, projectId, taskId, checkValue) => {
  return async function (dispatch) {
    const response = await firebaseDbRest.patch(
      `/${userId || "guest"}/projects/${projectId}/tasks/${taskId}.json`,
      { finished: checkValue }
    );
    console.log(checkValue);
    console.log(response.data);
    dispatch({
      type: actionTypes.TOGGLE_TASK_CHECK,
      payload: { ...response.data, id: taskId },
    });
  };
};

export const deleteTask = (userId, projectId, taskId) => {
  return async function (dispatch) {
    console.log(`deleting ${taskId}`);
    await firebaseDbRest.delete(
      `/${userId || "guest"}/projects/${projectId}/tasks/${taskId}.json`
    );
    dispatch({
      type: actionTypes.DELETE_TASK,
      payload: taskId,
    });
  };
};

export const deleteAllTasks = (userId, projectId) => {
  return async function (dispatch) {
    await firebaseDbRest.delete(
      `/${userId || "guest"}/projects/${projectId}/tasks.json`
    );
    dispatch({
      type: actionTypes.DELETE_ALL_TASKS,
    });
  };
};

// Sort task action creators here
export const sortTasksByName = (
  userId,
  tasks,
  projectId,
  order = "ascending"
) => {
  // tasks - array/object containing tasks
  // projectId - string that indicates the id of the project
  // order - string - which can have the value of either "ascending" or "descending"
  return async function (dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // Perform sorting by name
    console.log(tasks);
    let sortedTasks = [...tasks.sort(compareValues("name"))];

    if (order === "descending") {
      // reverse the order
      sortedTasks.reverse();
    }
    // save the sort setting in the database
    await firebaseDbRest.put(
      `/${userId || "guest"}/projects/${projectId}/sortBy.json`,
      {
        name: order,
      }
    );

    console.log(sortedTasks);
    dispatch({
      type: actionTypes.SORT_TASKS_BY_NAME,
      payload: sortedTasks,
    });
  };
};

export const sortTasksByDate = (
  userId,
  tasks,
  projectId,
  order = "ascending"
) => {
  // tasks - array/object containing tasks
  // projectId - string that indicates the id of the project
  // order - string - which can have the value of either "ascending" or "descending"
  return async function (dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // Perform sorting by date
    console.log(tasks);
    let sortedTasks = [...tasks.sort(compareValues("date"))];

    if (order === "descending") {
      // reverse the order
      sortedTasks.reverse();
    }
    // save the sort setting in the database
    await firebaseDbRest.put(
      `/${userId || "guest"}/projects/${projectId}/sortBy.json`,
      {
        name: order,
      }
    );

    console.log(sortedTasks);
    dispatch({
      type: actionTypes.SORT_TASKS_BY_DATE,
      payload: sortedTasks,
    });
  };
};

export const sortTasksByPriority = (
  userId,
  tasks,
  projectId,
  order = "ascending"
) => {
  // tasks - array/object containing tasks
  // projectId - string that indicates the id of the project
  // order - string - which can have the value of either "ascending" or "descending"
  return async function (dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // Perform sorting by priority
    console.log(tasks);
    let sortedTasks = [];

    if (order === "descending") {
      // sort by priority descending
      sortedTasks = [...tasks.sort(comparePriorityValues("desc"))];
    } else if (order === "ascending") {
      // sort by priority ascending
      sortedTasks = [...tasks.sort(comparePriorityValues())];
    }
    // save the sort setting in the database
    await firebaseDbRest.put(
      `/${userId || "guest"}/projects/${projectId}/sortBy.json`,
      {
        priority: order,
      }
    );

    console.log(sortedTasks);
    dispatch({
      type: actionTypes.SORT_TASKS_BY_PRIORITY,
      payload: sortedTasks,
    });
  };
};
// finished tasks action creators
export const fetchFinishedTasks = (userId) => {
  return async function (dispatch) {
    // Retrieve all projects first from the database
    const response = await firebaseDbRest.get(
      `/${userId || "guest"}/projects.json`
    );
    console.log(response.data);
    let finishedTasks = [];
    // only process if there is data in the first place
    if (response.data) {
      // get rid of the sortBy property so it is not included in the data
      const projects = _.omit({ ...response.data }, [
        "finishedSortBy",
        "sortBy",
        "dueTodaySortBy",
      ]);

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
      } else if (sortBy.date) {
        if (sortBy.date === "ascending") {
          finishedTasks = finishedTasks.sort(compareValues("date"));
        } else if (sortBy.date === "descending") {
          finishedTasks = finishedTasks.sort(compareValues("date", "desc"));
        }
      } else if (sortBy.priority) {
        if (sortBy.priority === "ascending") {
          finishedTasks = finishedTasks.sort(comparePriorityValues());
        } else if (sortBy.priority === "descending") {
          finishedTasks = finishedTasks.sort(comparePriorityValues("desc"));
        }
      }
    }

    console.log(finishedTasks);
    dispatch({
      type: actionTypes.FETCH_FINISHED_TASKS,
      payload: finishedTasks,
    });
  };
};

export const deleteFinishedTask = (taskIndex) => {
  console.log(taskIndex);
  return async function (dispatch) {
    dispatch({
      type: actionTypes.DELETE_FINISHED_TASK,
      payload: taskIndex,
    });
  };
};

export const deleteAllFinishedTasks = () => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.DELETE_ALL_FINISHED_TASKS,
    });
  };
};

// SORT FINISHED TASKS FUNCTIONS
export const sortFinishedTasksByName = (userId, tasks, order = "ascending") => {
  // tasks - array/object containing finished tasks
  // order - string - which can have the value of either "ascending" or "descending"
  return async function (dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // Perform sorting by name
    let sortedTasks = tasks.sort(compareValues("name"));

    if (order === "descending") {
      // reverse the order
      sortedTasks.reverse();
    }
    // save the sort setting in the database
    await firebaseDbRest.put(
      `/${userId || "guest"}/projects/finishedSortBy.json`,
      {
        name: order,
      }
    );

    dispatch({
      type: actionTypes.SORT_FINISHED_TASKS_BY_NAME,
      payload: sortedTasks,
    });
  };
};

export const sortFinishedTasksByDate = (userId, tasks, order = "ascending") => {
  // tasks - array/object containing tasks
  // order - string - which can have the value of either "ascending" or "descending"

  return async function (dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // save the order's setting in the database
    await firebaseDbRest.put(
      `/${userId || "guest"}/projects/finishedSortBy.json`,
      {
        date: order,
      }
    );
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
      payload: sortedTasks,
    });
  };
};

export const sortFinishedTasksByPriority = (
  userId,
  tasks,
  order = "ascending"
) => {
  // tasks - array/object containing tasks
  // order - string - which can have the value of either "ascending" or "descending"

  return async function (dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // save the order's setting in the database
    await firebaseDbRest.put(
      `/${userId || "guest"}/projects/finishedSortBy.json`,
      {
        priority: order,
      }
    );
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
      payload: sortedTasks,
    });
  };
};

// DUETODAY TASKS ACTION CREATORS
export const fetchDueToday = (userId) => {
  return async function (dispatch) {
    // Retrieve all projects first from the database
    const response = await firebaseDbRest.get(
      `/${userId || "guest"}/projects.json`
    );
    let dueToday = [];
    // only sort if there is data in the first place
    if (response.data) {
      // remove sort related properties
      const projects = _.omit({ ...response.data }, [
        "finishedSortBy",
        "sortBy",
        "dueTodaySortBy",
      ]);

      console.log(response);
      console.log(response.data);
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
      } else if (sortBy.date) {
        if (sortBy.date === "ascending") {
          dueToday = dueToday.sort(compareValues("date"));
        } else if (sortBy.date === "descending") {
          dueToday = dueToday.sort(compareValues("date", "desc"));
        }
      } else if (sortBy.priority) {
        if (sortBy.priority === "ascending") {
          dueToday = dueToday.sort(comparePriorityValues());
        } else if (sortBy.priority === "descending") {
          dueToday = dueToday.sort(comparePriorityValues("desc"));
        }
      }
    }

    dispatch({
      type: actionTypes.FETCH_DUE_TODAY,
      payload: dueToday,
    });
  };
};

export const deleteDueTodayTask = (taskIndex) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.DELETE_DUE_TODAY_TASK,
      payload: taskIndex,
    });
  };
};

export const editDueTodayTask = (taskIndex, formValues) => {
  return async function (dispatch) {
    if (!isToday(formValues.date)) {
      dispatch({
        type: actionTypes.DELETE_DUE_TODAY_TASK,
        payload: taskIndex,
      });
    } else {
      dispatch({
        type: actionTypes.EDIT_DUE_TODAY_TASK,
        payload: { ...{ ...formValues }, taskIndex },
      });
    }
  };
};

export const toggleDueTodayTaskCheck = (taskIndex, checkValue) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.TOGGLE_DUE_TODAY_TASK_CHECK,
      payload: { checkValue, taskIndex },
    });
  };
};

export const deleteAllDueTodayTasks = () => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.DELETE_ALL_DUE_TODAY_TASKS,
    });
  };
};

// SORT DUETODAY TASKS FUNCTIONS
export const sortDueTodayTasksByName = (userId, tasks, order = "ascending") => {
  // tasks - array/object containing finished tasks
  // order - string - which can have the value of either "ascending" or "descending"
  return async function (dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // Perform sorting by name
    let sortedTasks = tasks.sort(compareValues("name"));

    if (order === "descending") {
      // reverse the order and then save the sort setting in the database
      sortedTasks.reverse();
    }
    // save the sort setting in the database
    await firebaseDbRest.put(
      `/${userId || "guest"}/projects/dueTodaySortBy.json`,
      {
        name: order,
      }
    );

    dispatch({
      type: actionTypes.SORT_DUE_TODAY_TASKS_BY_NAME,
      payload: sortedTasks,
    });
  };
};

export const sortDueTodayTasksByDate = (userId, tasks, order = "ascending") => {
  // tasks - array/object containing tasks
  // order - string - which can have the value of either "ascending" or "descending"

  return async function (dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // save the order's setting in the database
    await firebaseDbRest.put(
      `/${userId || "guest"}/projects/dueTodaySortBy.json`,
      {
        date: order,
      }
    );
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
      type: actionTypes.SORT_DUE_TODAY_TASKS_BY_DATE,
      payload: sortedTasks,
    });
  };
};

export const sortDueTodayTasksByPriority = (
  userId,
  tasks,
  order = "ascending"
) => {
  // tasks - array/object containing tasks
  // order - string - which can have the value of either "ascending" or "descending"

  return async function (dispatch) {
    // this guards against objects being sent as an argument
    if (!Array.isArray(tasks) && typeof tasks === "object") {
      tasks = objectToArray(tasks);
    }
    // save the order's setting in the database
    await firebaseDbRest.put(
      `/${userId || "guest"}/projects/dueTodaySortBy.json`,
      {
        priority: order,
      }
    );
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
      type: actionTypes.SORT_DUE_TODAY_TASKS_BY_PRIORITY,
      payload: sortedTasks,
    });
  };
};

//Auth functions
export const authSignIn = ({ authMethod, userId }) => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.AUTH_SIGN_IN,
      payload: { authMethod, userId },
    });
  };
};

export const authSignOut = () => {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.AUTH_SIGN_OUT,
    });
  };
};
