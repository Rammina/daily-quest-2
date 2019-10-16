import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import selectedProjectReducer from "./selectedProjectReducer";

export default combineReducers({
  projects: projectsReducer,
  selectedProject: selectedProjectReducer
});
