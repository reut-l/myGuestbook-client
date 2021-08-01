import { LOG_IN, LOG_OUT, FORGOT_PWD_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: null,
  user: null,
  forgotPwdSubmitted: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        forgotPwdSubmitted: null,
      };
    case LOG_OUT:
      return { ...state, isLoggedIn: false, user: null };
    case FORGOT_PWD_SUCCESS:
      return {
        ...state,
        forgotPwdSubmitted: true,
      };
    default:
      return state;
  }
};

export default reducer;
