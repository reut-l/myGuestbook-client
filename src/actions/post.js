import myGuestBookAPI from '../apis/appServer';
import {
  CREATE_POST,
  FETCH_POST,
  FETCH_POSTS_EVENT,
  FETCH_POSTS_USER,
  FETCH_POSTS_USER_LIKED,
} from './types';
import history from '../history';

export const fetchPostsOfEvent = (eventId, term) => async (dispatch) => {
  const response = await myGuestBookAPI.get(
    `/posts/search?event=${eventId}&term=${term}`
  );

  dispatch({ type: FETCH_POSTS_EVENT, payload: response.data.data.data });
};

export const fetchMyPosts = async (dispatch, getState) => {
  const user = getState().auth.user._id;

  const response = await myGuestBookAPI.get(`/posts/search?user=${user}`);

  dispatch({ type: FETCH_POSTS_USER, payload: response.data.data.data });
};

export const fetchMyLikedPosts = async (dispatch, getState) => {
  const user = getState().auth.user._id;

  const response = await myGuestBookAPI.get(`/posts/search?likes=${user}`);

  dispatch({ type: FETCH_POSTS_USER_LIKED, payload: response.data.data.data });
};

export const updateImage = (postBlob, postId) => async (dispatch) => {
  const formData = new FormData();
  formData.append('screenshot', postBlob);
  const response = await myGuestBookAPI.patch(
    `/posts/${postId}/uploadImage`,
    formData,
    {
      headers: {
        'Content-Type': `multipart/form-data'; boundary=${formData._boundary}`,
      },
    }
  );

  dispatch({ type: FETCH_POST, payload: response.data.data.data });
};

export const createPost = (postBlob, eventId) => async (dispatch, getState) => {
  const user = getState().auth.user._id;

  const response = await myGuestBookAPI.post('/posts', {
    event: eventId,
    user,
  });

  dispatch({ type: CREATE_POST, payload: response.data.data.data });

  dispatch(updateImage(postBlob, response.data.data.data._id));

  history.push(`/events/${eventId}`);
};
