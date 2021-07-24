import { combineReducers } from 'redux';
import postsOfCurrentEventReducer from './post/currentEventReducer';
import myPostsReducer from './post/currentUserReducer';
import myLikedPostsReducer from './post/likesReducer';
import currenPostReducer from './post/currentPostReducer';

export default combineReducers({
  postsOfCurrentEvent: postsOfCurrentEventReducer,
  myPosts: myPostsReducer,
  myLikedPosts: myLikedPostsReducer,
  currentPost: currenPostReducer,
});
