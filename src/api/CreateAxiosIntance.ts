import axios from 'axios';
//import { useNavigate } from 'react-router';
const token = window.sessionStorage.getItem('token');
// const token = localStorage.getItem('token');
console.log('tokenaxios', token);

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  baseURL: process.env.REACT_APP_API_URL,
  responseType: 'json',
  withCredentials: false
});

// const useLogout = () => {
//   const navigate = useNavigate();

//   const logoutUser = () => {
//     // Perform actions to log the user out (clear authentication token, reset user state, etc.)
//     console.log('Token expired. Logging out.');
//     // Redirect to the login page
//     navigate('/login');
//     localStorage.clear();
//   };

//   return logoutUser;
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Check if the error is due to an expired token (401 Unauthorized)
//     if (error.response && error.response.status === 401) {
//       // Log the user out (clear authentication token, reset user state, etc.)
//       const logoutUser = useLogout();
//       logoutUser();
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
