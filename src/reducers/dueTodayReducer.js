import _ from "lodash";
import { actionTypes } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_DUE_TODAY:
      return [...action.payload];
    default:
      return state;
  }
};
