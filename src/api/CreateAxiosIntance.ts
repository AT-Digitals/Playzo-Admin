import axios from 'axios';

const CreateAxiosInstance = () => {
  const token = localStorage.getItem('token');

  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' // Adjust the content type as needed
    }
  });

  return instance;
};

export default CreateAxiosInstance;
