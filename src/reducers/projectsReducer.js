import _ from "lodash";
import { actionTypes } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS:
      return [...action.payload];
    case actionTypes.CREATE_PROJECT:
      return [].concat(state, action.payload);
    case actionTypes.EDIT_PROJECT:
      return state.map(item => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
        }
        return item;
      });
    case actionTypes.DELETE_PROJECT:
      return state.filter(item => item.id !== action.payload);
    case actionTypes.DELETE_ALL_PROJECTS:
      return [];
    case actionTypes.SORT_PROJECTS_BY_NAME:
      return [...action.payload];
    default:
      return state;
  }
};
