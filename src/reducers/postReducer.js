import { combineReducers } from 'redux';
import allPostsReducer from './post/allPostsReducer';
import myPostsReducer from './post/currentUserReducer';
import myLikedPostsReducer from './post/likesReducer';

export default combineReducers({
  allByEvent: allPostsReducer,
  myPosts: myPostsReducer,
  myLikedPosts: myLikedPostsReducer,
});
