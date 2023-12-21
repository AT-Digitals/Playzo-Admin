import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json' // Adjust the content type as needed
  }
});

export default axiosInstance
