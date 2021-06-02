import { LOG_IN, LOG_OUT } from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: null,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isLoggedIn: true, user: action.payload };
    case LOG_OUT:
      return { ...state, isLoggedIn: false, user: null };
    default:
      return state;
  }
};
