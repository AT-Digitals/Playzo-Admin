import axios from 'axios';
import { toast } from 'react-toastify';

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
  localStorage.removeItem('name');
  window.location.href = '/';
  toast.error('Access Token was expired!. Please log in again.', {
    autoClose: 5000,
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    theme: 'colored'
  });
};

export default axiosInstance;
