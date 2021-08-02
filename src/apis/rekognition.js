import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_AWS_REKOGNITION_SERVER_URL,
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
