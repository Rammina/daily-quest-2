import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import projectsReducer from "./projectsReducer";
import selectedProjectReducer from "./selectedProjectReducer";
import finishedTasksReducer from "./finishedTasksReducer";
import dueTodayReducer from "./dueTodayReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import loaderReducer from "./loaderReducer.js";

export default combineReducers({
  projects: projectsReducer,
  selectedProject: selectedProjectReducer,
  finishedTasks: finishedTasksReducer,
  dueToday: dueTodayReducer,
  form: formReducer,
  auth: authReducer,
  error: errorReducer,
  loader: loaderReducer,
});
