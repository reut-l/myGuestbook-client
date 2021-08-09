import _ from 'lodash';
import {
  FETCH_POST,
  FETCH_POSTS_EVENT,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  LOG_OUT,
} from '../../actions/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POST:
      return {
        ...state,
        [action.payload.event]: {
          ...state[action.payload.event],
          [action.payload._id]: action.payload,
        },
      };
    case FETCH_POSTS_EVENT:
      return {
        ...state,
        [action.payload.eventId]: _.mapKeys(action.payload.posts, '_id'),
      };
    case CREATE_POST:
      return {
        ...state,
        [action.payload.event]: {
          ...state[action.payload.event],
          [action.payload._id]: action.payload,
        },
      };
    case EDIT_POST:
      return {
        ...state,
        [action.payload.event]: {
          ...state[action.payload.event],
          [action.payload._id]: action.payload,
        },
      };
    case DELETE_POST:
      return _.omit(state[action.payload.eventId], action.payload.postId);
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};

export default reducer;
