import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import eventReducer from './eventReducer';
import postReducer from './postReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  events: eventReducer,
  posts: postReducer,
  errors: errorReducer,
});
