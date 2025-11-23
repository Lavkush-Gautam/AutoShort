import axios from "axios";

const api = axios.create({
  baseURL: "/api", // thanks to Vite proxy, this goes to http://localhost:5000/api
  withCredentials: true, // include cookies (for JWT httpOnly auth)
});

export default api;
