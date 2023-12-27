import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${token}`
  },
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
  withCredentials: false
});

export default axiosInstance;
