import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
  withCredentials: false
});

axiosInstance.interceptors.request.use((config) => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    config.headers['Authorization'] = `Bearer ${userToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 && error.response.data.message === 'Unauthorized! Access Token was expired!') {
      handleTokenExpiration();
    }
    return Promise.reject(error);
  }
);

const handleTokenExpiration = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  window.location.href = '/';
};

export default axiosInstance;
