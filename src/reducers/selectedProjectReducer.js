import { actionTypes } from "../actions";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT:
      return action.payload;
    case actionTypes.CREATE_TASK:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
