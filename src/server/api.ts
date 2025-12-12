import axios from 'axios';

const api = axios.create({
  baseURL: "https://portfolio-backend-two-navy.vercel.app/api/",
  withCredentials: true,
});

export default api;
