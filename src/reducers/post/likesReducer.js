import _ from 'lodash';
import {
  LIKE_POST,
  UNLIKE_POST,
  FETCH_POSTS_USER_LIKED,
  LOG_OUT,
} from '../../actions/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_POST:
      return {
        ...state,
        [action.payload._id]: action.payload,
      };
    case UNLIKE_POST:
      return _.omit(state, action.payload);
    case FETCH_POSTS_USER_LIKED:
      return {
        ...state,
        ..._.mapKeys(action.payload, '_id'),
      };
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};

export default reducer;
