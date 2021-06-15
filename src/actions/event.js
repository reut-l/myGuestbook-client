import _ from 'lodash';
import myGuestBookAPI from '../apis/appServer';
import { FETCH_EVENT, CREATE_EVENT, EDIT_EVENT, DELETE_EVENT } from './types';
import history from '../history';

export const fetchEvent = (eventId) => async (dispatch) => {
  const response = await myGuestBookAPI.get(`/events/${eventId}`);

  dispatch({
    type: FETCH_EVENT,
    payload: response.data.data.data,
  });
};

export const fetchMyEvent = (eventId) => async (dispatch) => {
  const response = await myGuestBookAPI.get(`/events/${eventId}/myEvent`);
  let guestsPhones = response.data.data.data.guestsPhones;
  guestsPhones = guestsPhones ? guestsPhones.join(' , ') : '';

  dispatch({
    type: FETCH_EVENT,
    payload: { ...response.data.data.data, guestsPhones },
  });
};

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
  console.log(response.data.data.data);
  dispatch({ type: EDIT_EVENT, payload: response.data.data.data });
};

export const createEvent = (formValues) => async (dispatch, getState) => {
  const user = getState().auth.user._id;

  const response = await myGuestBookAPI.post('/events', {
    ..._.omit(formValues, ['imageCover']),
    user,
  });

  dispatch({ type: CREATE_EVENT, payload: response.data.data.data });

  dispatch(
    updateImageCover(formValues.imageCover, response.data.data.data._id)
  );
  history.push(`/events/${response.data.data.data._id}/edit`);
};

export const editEvent = (formValues, eventId) => async (dispatch) => {
  const response = await myGuestBookAPI.patch(
    `/events/${eventId}`,
    _.omit(formValues, ['imageCover'])
  );

  dispatch({ type: EDIT_EVENT, payload: response.data.data.data });

  dispatch(
    updateImageCover(formValues.imageCover, response.data.data.data._id)
  );
  history.push('/');
};

export const deleteEvent = (eventId) => async (dispatch) => {
  await myGuestBookAPI.delete(`/events/${eventId}`);

  dispatch({ type: DELETE_EVENT, payload: eventId });
  history.push('/');
};
