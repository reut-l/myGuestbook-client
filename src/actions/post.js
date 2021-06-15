import myGuestBookAPI from '../apis/appServer';
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
} from './types';
import history from '../history';

export const fetchPost = (postId) => async (dispatch) => {
  const response = await myGuestBookAPI.get(`posts/${postId}`);

  dispatch({ type: FETCH_POST, payload: response.data.data.data });
};

export const fetchPostsOfEvent = (eventId, term) => async (dispatch) => {
  const response = await myGuestBookAPI.get(
    `/posts/search?event=${eventId}&term=${term}`
  );

  dispatch({ type: FETCH_POSTS_EVENT, payload: response.data.data.data });
};

export const fetchMyPosts = () => async (dispatch, getState) => {
  const user = getState().auth.user._id;

  const response = await myGuestBookAPI.get(`/posts/search?user=${user}`);

  dispatch({ type: FETCH_POSTS_USER, payload: response.data.data.data });
};

export const fetchMyLikedPosts = () => async (dispatch, getState) => {
  const user = getState().auth.user._id;

  const response = await myGuestBookAPI.get(`/posts/search?likes=${user}`);

  dispatch({ type: FETCH_POSTS_USER_LIKED, payload: response.data.data.data });
  dispatch({ type: LOADED_MY_POSTS });
};

export const updatePostImage =
  (postBlob, postId, eventId) => async (dispatch) => {
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

    dispatch({ type: EDIT_POST, payload: response.data.data.data });
    if (eventId) history.push(`/events/${eventId}`);
  };

export const createPost = (postBlob, eventId) => async (dispatch, getState) => {
  const user = getState().auth.user._id;

  const response = await myGuestBookAPI.post('/posts', {
    event: eventId,
    user,
  });

  dispatch({ type: CREATE_POST, payload: response.data.data.data });

  await dispatch(updatePostImage(postBlob, response.data.data.data._id));

  history.push(`/events/${eventId}`);
};

export const deletePost = (postId, eventId) => async (dispatch) => {
  await myGuestBookAPI.delete(`/posts/${postId}`);

  dispatch({ type: DELETE_POST, payload: postId });
  history.push(`/events/${eventId}`);
};

export const like = (post) => async (dispatch) => {
  const response = await myGuestBookAPI.patch(`/posts/${post._id}/like`);

  if (response.data.status === 'success')
    dispatch({ type: LIKE_POST, payload: response.data.data.data });
};

export const unlike = (post) => async (dispatch) => {
  const response = await myGuestBookAPI.patch(`/posts/${post._id}/unlike`);

  if (response.data.status === 'success')
    dispatch({ type: UNLIKE_POST, payload: response.data.data.data });
};
