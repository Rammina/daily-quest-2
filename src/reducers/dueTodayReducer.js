import _ from "lodash";
import { actionTypes } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_DUE_TODAY:
      return [...action.payload];
    case actionTypes.DELETE_DUE_TODAY_TASK:
      return state.filter((e, index) => index !== Number(action.payload));
    default:
      return state;
  }
};
