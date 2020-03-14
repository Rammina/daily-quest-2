import { actionTypes } from "../actions";

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GOOGLE_SIGN_IN:
      return { ...state, isSignedIn: true, user: { ...action.payload } };
    case actionTypes.GOOGLE_SIGN_OUT:
      return { ...state, isSignedIn: false, user: null };
    default:
      return state;
  }
};
