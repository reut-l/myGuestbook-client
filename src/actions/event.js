import _ from 'lodash';
import myGuestBookAPI from '../apis/appServer';
import {
  FETCH_EVENT,
  CREATE_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  ADD_FILTERED_EVENT,
  REMOVE_FILTERED_EVENT,
  SHOW_EVENT_FAIL,
  GENERAL_ERROR,
} from './types';
import history from '../history';

export const fetchEvent = (eventId) => async (dispatch) => {
  try {
    const response = await myGuestBookAPI.get(`/events/${eventId}`);

    dispatch({
      type: FETCH_EVENT,
      payload: response.data.data.data,
    });
  } catch (error) {
    // In case of an operational error- id not found in DB
    if (
      error.response &&
      error.response.data.status === 'fail' &&
      error.response.data.message.startsWith('Invalid _id')
    ) {
      dispatch({
        type: SHOW_EVENT_FAIL,
      });
    } else {
      dispatch({ type: GENERAL_ERROR });
    }
  }
};

// Fetch event, including guests phone numbers
export const fetchMyEvent = (eventId) => async (dispatch) => {
  try {
    const response = await myGuestBookAPI.get(`/events/${eventId}/myEvent`);
    let guestsPhones = response.data.data.data.guestsPhones;
    guestsPhones = guestsPhones ? guestsPhones.join(' , ') : '';

    dispatch({
      type: FETCH_EVENT,
      payload: { ...response.data.data.data, guestsPhones },
    });
  } catch (error) {
    dispatch({ type: GENERAL_ERROR });
  }
};

// Creating event, without imageCover (since it is a non-string/file type field)
export const createEvent = (formValues) => async (dispatch, getState) => {
  const user = getState().auth.user._id;

  try {
    const response = await myGuestBookAPI.post('/events', {
      ..._.omit(formValues, ['imageCover']),
      user,
    });

    dispatch({ type: CREATE_EVENT, payload: response.data.data.data });

    if (formValues.imageCover)
      dispatch(
        updateImageCover(formValues.imageCover, response.data.data.data._id)
      );
    history.push(`/events/${response.data.data.data._id}/edit`);
  } catch (error) {
    dispatch({ type: GENERAL_ERROR });
  }
};

// Editing event, without imageCover (since it is a non-string/file type field)
export const editEvent = (formValues, eventId) => async (dispatch) => {
  try {
    const response = await myGuestBookAPI.patch(
      `/events/${eventId}`,
      _.omit(formValues, ['imageCover'])
    );

    dispatch({ type: EDIT_EVENT, payload: response.data.data.data });

    if (formValues.imageCover)
      dispatch(
        updateImageCover(formValues.imageCover, response.data.data.data._id)
      );
    history.push('/');
  } catch (error) {
    dispatch({ type: GENERAL_ERROR });
  }
};

// Updating the created/edited event with the imageCover
export const updateImageCover = (image, eventId) => async (dispatch) => {
  const formData = new FormData();
  formData.append('imageCover', image.file);
  const response = await myGuestBookAPI.patch(
    `/events/${eventId}/uploadCover`,
    formData,
    {
      headers: {
        'Content-Type': `multipart/form-data'; boundary=${formData._boundary}`,
      },
    }
  );

  dispatch({ type: EDIT_EVENT, payload: response.data.data.data });
};

export const deleteEvent = (eventId) => async (dispatch) => {
  await myGuestBookAPI.delete(`/events/${eventId}`);

  dispatch({ type: DELETE_EVENT, payload: eventId });
  history.push('/');
};

export const addFilteredEvent = (eventId) => (dispatch) => {
  dispatch({ type: ADD_FILTERED_EVENT, payload: eventId });
};

export const removeFilteredEvent = (eventId) => (dispatch) => {
  dispatch({ type: REMOVE_FILTERED_EVENT, payload: eventId });
};
