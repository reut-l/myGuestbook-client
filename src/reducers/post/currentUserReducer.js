import _ from 'lodash';
import { FETCH_POSTS_USER, LOG_OUT } from '../../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS_USER:
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
