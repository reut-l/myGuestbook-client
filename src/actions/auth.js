import myGuestBookAPI from '../apis/appServer';
import {
  FETCH_EVENTS,
  LOG_IN,
  LOG_OUT,
  LOG_IN_FAIL,
  SIGN_UP_FAIL,
  GENERAL_ERROR,
} from './types';
import history from '../history';

// Helper function
// Split the response and dispatch different actions
const splitResponseAndDispatch = (dispatch, response, previousPath) => {
  const { _id, name, email, phone, eventsAsGuest, eventsAsCreator } =
    response.data.data.user;

  response.user = { _id, name, email, phone };
  response.events = { eventsAsGuest, eventsAsCreator };

  dispatch({ type: LOG_IN, payload: response.user });
  dispatch({ type: FETCH_EVENTS, payload: response.events });

  // Programmatically navigate back to the previous page
  if (previousPath) {
    history.push(previousPath);
  } else if (previousPath === null) {
    return;
  } else {
    history.push('/');
  }
};

export const checkIsLoggedIn = () => async (dispatch, getState) => {
  if (getState().auth.isLoggedIn) return;

  try {
    const response = await myGuestBookAPI.post('/users/isLoggedIn');

    if (response.data.data.isLoggedIn)
      splitResponseAndDispatch(dispatch, response, null);

    if (!response.data.data.isLoggedIn) dispatch({ type: LOG_OUT });
  } catch (error) {
    dispatch({ type: GENERAL_ERROR });
  }
};

export const login = (formValues, previousPath) => async (dispatch) => {
  const { email, password } = formValues;

  try {
    const response = await myGuestBookAPI.post('/users/login', {
      email,
      password,
    });

    if (response) splitResponseAndDispatch(dispatch, response, previousPath);
  } catch (error) {
    // In case of an operational error, such as validation and other errors based on DB
    if (error.response && error.response.data.status === 'fail') {
      dispatch({ type: LOG_IN_FAIL, payload: error.response.data.message });
    } else {
      dispatch({ type: GENERAL_ERROR });
    }
  }
};

export const logout = () => async (dispatch) => {
  const response = await myGuestBookAPI.get('/users/logout');

  if (response.data.status === 'success') {
    dispatch({ type: LOG_OUT });
    history.push('/');
  }
};

export const signUp = (formValues, previousPath) => async (dispatch) => {
  try {
    const response = await myGuestBookAPI.post('/users/signup', formValues);

    splitResponseAndDispatch(dispatch, response, previousPath);
  } catch (error) {
    // In case of an operational error, such as validation and other errors based on DB
    if (error.response && error.response.data.status === 'fail') {
      dispatch({ type: SIGN_UP_FAIL, payload: error.response.data.message });
    } else {
      dispatch({ type: GENERAL_ERROR });
    }
  }
};

export const updateMe = (formValues) => async (dispatch) => {
  const response = await myGuestBookAPI.patch('/users/updateMe', formValues);

  splitResponseAndDispatch(dispatch, response, null);
};
