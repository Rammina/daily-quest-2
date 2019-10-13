import { combineReducers } from 'redux';
import projectsReducer from './projectsReducer';

export default combineReducers({
	projects: projectsReducer
})