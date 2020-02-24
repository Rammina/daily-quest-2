import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import projectsReducer from "./projectsReducer";
import selectedProjectReducer from "./selectedProjectReducer";
import finishedTasksReducer from "./finishedTasksReducer";
import dueTodayReducer from "./dueTodayReducer";
import googleAuthReducer from "./googleAuthReducer";

export default combineReducers({
  projects: projectsReducer,
  selectedProject: selectedProjectReducer,
  finishedTasks: finishedTasksReducer,
  dueToday: dueTodayReducer,
  form: formReducer,
  googleAuth: googleAuthReducer
});
