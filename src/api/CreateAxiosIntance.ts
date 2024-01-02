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
  const User = localStorage.getItem('user');
  if (User) {
    const userData = JSON.parse(User);
    const userToken = userData.token;

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

const handleTokenExpiration = async () => {
  localStorage.clear();
  await toast.error('Session expired. Please log in again.', {
    autoClose: 8000,
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    theme: 'colored'
  });
  window.location.href = '/';
};

export default axiosInstance;
