import _ from "lodash";
import { actionTypes } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case actionTypes.FETCH_PROJECT:
      return { ...state, [action.payload.id]: action.payload };
    case actionTypes.CREATE_PROJECT:
      console.log(" error occurs here because there is no ID ");
      return { ...state, [action.payload.id]: action.payload };
    case actionTypes.EDIT_PROJECT:
      return { ...state, [action.payload.id]: action.payload };
    case actionTypes.DELETE_PROJECT:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
