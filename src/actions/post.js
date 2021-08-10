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
  SHOW_POST_FAIL,
  GENERAL_ERROR,
} from './types';
import history from '../history';

export const fetchPost = (postId) => async (dispatch) => {
  try {
    const response = await myGuestBookAPI.get(`posts/${postId}`);

    dispatch({ type: FETCH_POST, payload: response.data.data.data });
  } catch (error) {
    if (
      // In case of an operational error- id not found in DB
      error.response &&
      error.response.data.status === 'fail' &&
      error.response.data.message.startsWith('Invalid _id')
    ) {
      dispatch({
        type: SHOW_POST_FAIL,
      });
    } else {
      dispatch({ type: GENERAL_ERROR });
    }
  }
};

// Fetch all posts of an event (when term equals '') or those that match the search term (searching posts by their creator- his name/phone/email)
export const fetchPostsOfEvent =
  (eventId, term = '') =>
  async (dispatch) => {
    const response = await myGuestBookAPI.get(
      `/posts/search?event=${eventId}&term=${term}`
    );

    // Cleaning the posts in the response from likes array
    // const filteredResponse = response.data.data.data.map((e) =>
    //   _.omit(e, ['likes'])
    // );

    dispatch({
      type: FETCH_POSTS_EVENT,
      payload: { posts: response.data.data.data, eventId },
    });
  };

// Fetch current user's posts
export const fetchMyPosts = () => async (dispatch, getState) => {
  const user = getState().auth.user._id;

  const response = await myGuestBookAPI.get(`/posts/search?user=${user}`);

  dispatch({ type: FETCH_POSTS_USER, payload: response.data.data.data });
};

// Fetch posts that current user liked
export const fetchMyLikedPosts = () => async (dispatch, getState) => {
  const user = getState().auth.user._id;

  const response = await myGuestBookAPI.get(`/posts/search?likes=${user}`);

  dispatch({ type: FETCH_POSTS_USER_LIKED, payload: response.data.data.data });
};

// Create the post, and then add it's image/screenshot (a file data type)
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

// Update post's image/screenshot
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

export const deletePost = (postId, eventId) => async (dispatch) => {
  await myGuestBookAPI.delete(`/posts/${postId}`);

  dispatch({ type: DELETE_POST, payload: { postId, eventId } });
  history.push(`/events/${eventId}`);
};

export const like = (postId) => async (dispatch) => {
  const response = await myGuestBookAPI.patch(`/posts/${postId}/like`);

  if (response.data.status === 'success')
    dispatch({ type: LIKE_POST, payload: response.data.data.data });
};

export const unlike = (postId) => async (dispatch) => {
  const response = await myGuestBookAPI.patch(`/posts/${postId}/unlike`);

  if (response.data.status === 'success')
    dispatch({ type: UNLIKE_POST, payload: response.data.data.data._id });
};
