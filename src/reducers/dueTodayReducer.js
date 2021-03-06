import _ from "lodash";
import { actionTypes } from "../actions";
import { replaceAt } from "../helpers";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_DUE_TODAY:
      return [...action.payload];
    case actionTypes.DELETE_DUE_TODAY_TASK:
      return state.filter((item, index) => index !== Number(action.payload));
    case actionTypes.EDIT_DUE_TODAY_TASK:
      return replaceAt(state, action.payload.taskIndex, action.payload);
    case actionTypes.TOGGLE_DUE_TODAY_TASK_CHECK:
      return state.map((item, index) => {
        if (index === Number(action.payload.taskIndex)) {
          item.finished = action.payload.checkValue;
          return item;
        }
        return item;
      });
    case actionTypes.DELETE_ALL_DUE_TODAY_TASKS:
      return [];
    case actionTypes.SORT_DUE_TODAY_TASKS_BY_NAME:
      return [...action.payload];
    case actionTypes.SORT_DUE_TODAY_TASKS_BY_DATE:
      return [...action.payload];
    case actionTypes.SORT_DUE_TODAY_TASKS_BY_PRIORITY:
      return [...action.payload];
    default:
      return state;
  }
};
