import _ from 'lodash';
import {
  FETCH_EVENTS,
  FETCH_EVENT,
  CREATE_EVENT,
  LOG_OUT,
  EDIT_EVENT,
  DELETE_EVENT,
} from '../actions/types';

const INITIAL_STATE = {
  eventsAsGuest: {},
  eventsAsCreator: {},
  currentEvent: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
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
        currentEvent: action.payload,
      };
    case CREATE_EVENT:
      return {
        ...state,
        eventsAsCreator: {
          ...state.eventsAsCreator,
          [action.payload._id]: action.payload,
        },
      };
    case EDIT_EVENT:
      return {
        ...state,
        eventsAsCreator: {
          ...state.eventsAsCreator,
          [action.payload._id]: action.payload,
        },
      };
    case DELETE_EVENT:
      return {
        ...state,
        eventsAsCreator: _.omit(state.eventsAsCreator, action.payload),
      };
    case LOG_OUT:
      return {
        ...state,
        eventsAsGuest: {},
        eventsAsCreator: {},
        currentEvent: null,
      };
    default:
      return state;
  }
};
