import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import projectsReducer from "./projectsReducer";
import selectedProjectReducer from "./selectedProjectReducer";

export default combineReducers({
  projects: projectsReducer,
  selectedProject: selectedProjectReducer,
  form: formReducer
});
