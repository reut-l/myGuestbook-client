import _ from 'lodash';
import {
  FETCH_EVENTS,
  FETCH_EVENT,
  CREATE_EVENT,
  LOG_OUT,
  EDIT_EVENT,
  DELETE_EVENT,
  ADD_FILTERED_EVENT,
  REMOVE_FILTERED_EVENT,
} from '../actions/types';

const INITIAL_STATE = {
  all: {},
  filtered: {},
  eventsAsGuest: {},
  eventsAsCreator: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        all: {
          ...state.all,
          ..._.mapKeys(action.payload.eventsAsGuest, '_id'),
          ..._.mapKeys(action.payload.eventsAsCreator, '_id'),
        },
        eventsAsGuest: {
          ...state.eventsAsGuest,
          ..._.mapKeys(action.payload.eventsAsGuest, '_id'),
        },
        eventsAsCreator: {
          ...state.eventsAsCreator,
          ..._.mapKeys(action.payload.eventsAsCreator, '_id'),
        },
      };
    case FETCH_EVENT:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload._id]: action.payload,
        },
      };
    case CREATE_EVENT:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload._id]: action.payload,
        },
        eventsAsCreator: {
          ...state.eventsAsCreator,
          [action.payload._id]: action.payload,
        },
      };
    case EDIT_EVENT:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload._id]: action.payload,
        },
        eventsAsCreator: {
          ...state.eventsAsCreator,
          [action.payload._id]: action.payload,
        },
      };
    case DELETE_EVENT:
      return {
        ...state,
        all: _.omit(state.all, action.payload),
        eventsAsCreator: _.omit(state.eventsAsCreator, action.payload),
      };
    case ADD_FILTERED_EVENT:
      return {
        ...state,
        filtered: { [action.payload]: true },
      };
    case REMOVE_FILTERED_EVENT:
      return {
        ...state,
        filtered: _.omit(state.filtered, action.payload),
      };
    case LOG_OUT:
      return {
        ...state,
        all: {},
        filtered: {},
        eventsAsGuest: {},
        eventsAsCreator: {},
      };
    default:
      return state;
  }
};

export default reducer;
