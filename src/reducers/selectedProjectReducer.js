import { actionTypes } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT:
      return { ...state, ...action.payload };
    case actionTypes.CREATE_TASK:
      console.log("state changed");
      return {
        ...state,
        tasks: { ...state.tasks, [action.payload.id]: action.payload }
      };
    default:
      return state;
  }
};
