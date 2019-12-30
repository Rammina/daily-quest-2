import _ from "lodash";
import { actionTypes } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT:
      return { ...action.payload };
    case actionTypes.CREATE_TASK:
      return {
        ...state,
        tasks: [].concat(state.tasks, action.payload)
      };
    case actionTypes.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(item => {
          if (item.id === action.payload.id) {
            item = action.payload;
          }
          return item;
        })
      };
    case actionTypes.TOGGLE_TASK_CHECK:
      // preventing errors in due today
      if (!state.tasks) return state;

      return {
        ...state,
        tasks: state.tasks.map(item => {
          if (item.id === action.payload.id) {
            item.finished = action.payload.finished;
          }
          return item;
        })
      };
    case actionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(item => item.id !== action.payload)
      };
    case actionTypes.DELETE_ALL_TASKS:
      return { ...state, tasks: [] };
    case actionTypes.SORT_TASKS_BY_NAME:
      return { ...state, tasks: action.payload };
    case actionTypes.SORT_TASKS_BY_DATE:
      return { ...state, tasks: action.payload };
    case actionTypes.SORT_TASKS_BY_PRIORITY:
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};
