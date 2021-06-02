import myGuestBookAPI from '../apis/appServer';
import { FETCH_EVENTS, LOG_IN, LOG_OUT } from './types';
import history from '../history';

const splitResponseAndDispatch = (dispatch, response) => {
  const { _id, name, email, eventsAsGuest, eventsAsCreator } =
    response.data.data.user;

  response.user = { _id, name, email };
  response.events = { eventsAsGuest, eventsAsCreator };

  dispatch({ type: LOG_IN, payload: response.user });
  dispatch({ type: FETCH_EVENTS, payload: response.events });
};

export const checkIsLoggedIn = () => async (dispatch, getState) => {
  if (getState().auth.isLoggedIn) return;

  const response = await myGuestBookAPI.post('/users/isLoggedIn');

  if (response.data.data.isLoggedIn)
    splitResponseAndDispatch(dispatch, response);

  if (!response.data.data.isLoggedIn) dispatch({ type: LOG_OUT });
};

export const login = (email, password) => async (dispatch) => {
  const response = await myGuestBookAPI.post('/users/login', {
    email: 'eyal@gmail.com',
    password: 'test1234',
  });

  splitResponseAndDispatch(dispatch, response);
};

export const logout = () => async (dispatch) => {
  const response = await myGuestBookAPI.get('/users/logout');

  if (response.data.status === 'success') {
    dispatch({ type: LOG_OUT });
    history.push('/');
  }
};

export const signUp = (formValues) => async (dispatch, getState) => {
  const reqObj = formValues;

  const currentEvent = getState().events.currentEvent;
  if (currentEvent !== null) reqObj.eventsAsGuest = currentEvent;

  const response = await myGuestBookAPI.post('/users/signup', reqObj);

  splitResponseAndDispatch(dispatch, response);
  history.push('/dashboard');
};


