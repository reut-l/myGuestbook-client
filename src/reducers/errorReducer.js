import {
  LOG_IN_FAIL,
  SIGN_UP_FAIL,
  LOG_IN,
  GENERAL_ERROR,
  SHOW_EVENT_FAIL,
  SHOW_POST_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  validation: {
    login: null,
    signup: null,
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
    case LOG_IN:
      return {
        ...state,
        validation: {
          ...state.validation,
          login: null,
          signup: null,
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
