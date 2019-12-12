import _ from "lodash";
import { actionTypes } from "../actions";
import { replaceAt } from "../helpers";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_DUE_TODAY:
      return [...action.payload];
    case actionTypes.DELETE_DUE_TODAY_TASK:
      return state.filter((e, index) => index !== Number(action.payload));
    case actionTypes.EDIT_DUE_TODAY_TASK:
      return replaceAt(state, action.payload.taskIndex, action.payload);
    case actionTypes.DELETE_ALL_DUE_TODAY_TASKS:
      return [];
    default:
      return state;
  }
};
