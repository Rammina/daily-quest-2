import _ from "lodash";
import { actionTypes } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT:
      return { ...action.payload };
    case actionTypes.CREATE_TASK:
      return {
        ...state,
        tasks: { ...state.tasks, [action.payload.id]: action.payload }
      };
    case actionTypes.EDIT_TASK:
      return {
        ...state,
        tasks: { ...state.tasks, [action.payload.id]: action.payload }
      };
    case actionTypes.TOGGLE_TASK_CHECK:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.id]: {
            ...state.tasks[action.payload.id],
            ...action.payload
          }
        }
      };
    case actionTypes.DELETE_TASK:
      return { ...state, tasks: _.omit(state.tasks, action.payload) };
    case actionTypes.DELETE_ALL_TASKS:
      return {};
    default:
      return state;
  }
};
