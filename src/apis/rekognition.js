import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3002/api',
  credentials: 'same-origin',
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
