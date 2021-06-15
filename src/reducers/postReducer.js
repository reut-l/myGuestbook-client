import _ from 'lodash';
import {
  FETCH_POST,
  FETCH_POSTS_EVENT,
  FETCH_POSTS_USER,
  FETCH_POSTS_USER_LIKED,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
  LOADED_MY_POSTS,
  LOG_OUT,
} from '../actions/types';

const INITIAL_STATE = {
  postsOfCurrentEvent: {},
  myPosts: {},
  myLikedPosts: {},
  currentPost: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, currentPost: action.payload };
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
    case CREATE_POST:
      return {
        ...state,
        postsOfCurrentEvent: {
          ...state.postsOfCurrentEvent,
          [action.payload._id]: action.payload,
        },
      };
    case EDIT_POST:
      return {
        ...state,
        postsOfCurrentEvent: {
          ...state.postsOfCurrentEvent,
          [action.payload._id]: action.payload,
        },
      };
    case DELETE_POST:
      return {
        ...state,
        postsOfCurrentEvent: _.omit(state.postsOfCurrentEvent, action.payload),
      };
    case LOADED_MY_POSTS:
      return {
        ...state,
        loaded: true,
      };

    case LIKE_POST:
      const likesReturnObj = {
        ...state,
        myLikedPosts: {
          ...state.myLikedPosts,
          [action.payload._id]: action.payload,
        },
      };

      if (
        !isEmpty(state.postsOfCurrentEvent) &&
        action.payload.event === _.values(state.postsOfCurrentEvent)[0].event
      )
        likesReturnObj.postsOfCurrentEvent = {
          ...state.postsOfCurrentEvent,
          [action.payload._id]: action.payload,
        };

      return likesReturnObj;

    case UNLIKE_POST:
      const unlikeReturnObj = {
        ...state,
        myLikedPosts: _.omit(state.myLikedPosts, action.payload._id),
      };

      if (
        !isEmpty(state.postsOfCurrentEvent) &&
        action.payload.event === _.values(state.postsOfCurrentEvent)[0].event
      )
        unlikeReturnObj.postsOfCurrentEvent = {
          ...state.postsOfCurrentEvent,
          [action.payload._id]: action.payload,
        };

      return unlikeReturnObj;

    case LOG_OUT:
      return {
        ...state,
        postsOfCurrentEvent: {},
        myPosts: {},
        myLikedPosts: {},
        currentPost: null,
      };
    default:
      return state;
  }
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
