import _ from 'lodash';
import myGuestBookAPI from '../apis/appServer';
import { FETCH_EVENT, CREATE_EVENT } from './types';
import history from '../history';

export const fetchEvent = (eventId) => async (dispatch) => {
  const response = await myGuestBookAPI.get(`/events/${eventId}`);
  const eventDetails = response.data.data.data;

  dispatch({
    type: FETCH_EVENT,
    payload: _.omit(eventDetails, ['guestsPhones']),
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

  dispatch({ type: FETCH_EVENT, payload: response.data.data.data });
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
