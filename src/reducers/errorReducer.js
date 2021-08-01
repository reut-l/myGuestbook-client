import {
  LOG_IN_FAIL,
  SIGN_UP_FAIL,
  FORGOT_PWD_FAIL,
  FORGOT_PWD_SUCCESS,
  RESET_PWD_FAIL,
  LOG_IN,
  GENERAL_ERROR,
  SHOW_EVENT_FAIL,
  SHOW_POST_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  validation: {
    login: null,
    signup: null,
    forgotPwd: null,
    resetPwd: null,
  },
  general: null,
  routing: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN_FAIL:
      return {
        ...state,
        validation: {
          ...state.validation,
          login: action.payload,
        },
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        validation: {
          ...state.validation,
          signup: action.payload,
        },
      };
    case FORGOT_PWD_FAIL:
      return {
        ...state,
        validation: {
          ...state.validation,
          forgotPwd: action.payload,
        },
      };
    case FORGOT_PWD_SUCCESS:
      return {
        ...state,
        validation: {
          ...state.validation,
          forgotPwd: null,
        },
      };
    case RESET_PWD_FAIL:
      return {
        ...state,
        validation: {
          ...state.validation,
          resetPwd: action.payload,
        },
      };
    case LOG_IN:
      return {
        ...state,
        validation: {
          ...state.validation,
          login: null,
          signup: null,
          resetPwd: null,
        },
      };
    // Event ID that in the url not found
    case SHOW_EVENT_FAIL:
      return {
        ...state,
        routing: true,
      };
    // Post ID that in the url not found
    case SHOW_POST_FAIL:
      return {
        ...state,
        routing: true,
      };
    // General errors such as communication and non-oparational (non-controlled) server errors
    case GENERAL_ERROR:
      return {
        ...state,
        general: true,
      };
    default:
      return state;
  }
};

export default reducer;
