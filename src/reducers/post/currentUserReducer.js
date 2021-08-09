import _ from 'lodash';
import {
  FETCH_POSTS_USER,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  LOG_OUT,
} from '../../actions/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS_USER:
      return {
        ...state,
        ..._.mapKeys(action.payload, '_id'),
      };
    case CREATE_POST:
      return {
        ...state,
        [action.payload._id]: action.payload,
      };
    case EDIT_POST:
      return {
        ...state,
        [action.payload._id]: action.payload,
      };
    case DELETE_POST:
      return _.omit(state, action.payload.postId);
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};

export default reducer;
