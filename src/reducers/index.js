import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import projectsReducer from "./projectsReducer";
import selectedProjectReducer from "./selectedProjectReducer";
import finishedTasksReducer from "./finishedTasksReducer";

export default combineReducers({
  projects: projectsReducer,
  selectedProject: selectedProjectReducer,
  finishedTasks: finishedTasksReducer,
  form: formReducer
});
