import myGuestBookAPI from '../apis/appServer';
import { FETCH_EVENTS, LOG_IN, LOG_OUT } from './types';
import history from '../history';

const splitResponseAndDispatch = (dispatch, response, sourcePath) => {
  const { _id, name, email, phone, eventsAsGuest, eventsAsCreator } =
    response.data.data.user;

  response.user = { _id, name, email, phone };
  response.events = { eventsAsGuest, eventsAsCreator };

  dispatch({ type: LOG_IN, payload: response.user });
  dispatch({ type: FETCH_EVENTS, payload: response.events });

  if (sourcePath) history.push(sourcePath);
};

export const checkIsLoggedIn = () => async (dispatch, getState) => {
  if (getState().auth.isLoggedIn) return;

  const response = await myGuestBookAPI.post('/users/isLoggedIn');

  if (response.data.data.isLoggedIn)
    splitResponseAndDispatch(dispatch, response);

  if (!response.data.data.isLoggedIn) dispatch({ type: LOG_OUT });
};

export const login = (formValues, sourcePath) => async (dispatch) => {
  const { email, password } = formValues;
  const response = await myGuestBookAPI.post('/users/login', {
    email,
    password,
  });

  splitResponseAndDispatch(dispatch, response, sourcePath);
};

export const logout = () => async (dispatch) => {
  const response = await myGuestBookAPI.get('/users/logout');

  if (response.data.status === 'success') {
    dispatch({ type: LOG_OUT });
    history.push('/');
  }
};

export const signUp = (formValues, sourcePath) => async (dispatch) => {
  const response = await myGuestBookAPI.post('/users/signup', formValues);

  splitResponseAndDispatch(dispatch, response, sourcePath);
};

export const updateMe = (formValues) => async (dispatch) => {
  const response = await myGuestBookAPI.patch('/users/updateMe', formValues);

  splitResponseAndDispatch(dispatch, response);
};
