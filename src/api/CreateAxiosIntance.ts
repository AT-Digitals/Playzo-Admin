import axios from 'axios';

const token = localStorage.getItem('token');
console.log('token', token);

export const getAuthorizationHeader = () => `Bearer ${token}`;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    Authorization: getAuthorizationHeader(),
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
