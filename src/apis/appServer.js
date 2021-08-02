import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://damp-retreat-28399.herokuapp.com/api/v1',
  baseURL: 'http://localhost:3001/api/v1',
  withCredentials: true,
});

// Through an error when response is other than 2XX
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
