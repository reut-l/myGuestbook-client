import { FETCH_POST, LOG_OUT } from '../../actions/types';

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_POST:
      return action.payload;
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};
