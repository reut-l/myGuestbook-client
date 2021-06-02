import _ from 'lodash';
import {
  CREATE_POST,
  FETCH_POST,
  FETCH_POSTS_EVENT,
  FETCH_POSTS_USER,
  FETCH_POSTS_USER_LIKED,
} from '../actions/types';

const INITIAL_STATE = {
  postsOfCurrentEvent: {},
  myPosts: {},
  myLikedPosts: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POSTS_EVENT:
      return {
        ...state,
        postsOfCurrentEvent: {
          ...state.postsOfCurrentEvent,
          ..._.mapKeys(action.payload, '_id'),
        },
      };
    case FETCH_POSTS_USER:
      return {
        ...state,
        myPosts: {
          ...state.myPosts,
          ..._.mapKeys(action.payload, '_id'),
        },
      };
    case FETCH_POSTS_USER_LIKED:
      return {
        ...state,
        myLikedPosts: {
          ...state.myLikedPosts,
          ..._.mapKeys(action.payload, '_id'),
        },
      };
    case FETCH_POST:
      return {
        ...state,
        postsOfCurrentEvent: {
          ...state.postsOfCurrentEvent,
          [action.payload._id]: action.payload,
        },
      };
    case CREATE_POST:
      return {
        ...state,
        postsOfCurrentEvent: {
          ...state.postsOfCurrentEvent,
          [action.payload._id]: action.payload,
        },
      };
    default:
      return state;
  }
};
