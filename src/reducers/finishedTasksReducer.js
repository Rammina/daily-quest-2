import _ from "lodash";
import { actionTypes } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_FINISHED_TASKS:
      return [...action.payload];
    case actionTypes.DELETE_FINISHED_TASK:
      return state.filter((e, index) => index !== Number(action.payload));
    case actionTypes.DELETE_ALL_FINISHED_TASKS:
      return [];
    default:
      return state;
  }
};
