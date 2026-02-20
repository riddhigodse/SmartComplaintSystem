import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

// Optional: Add interceptor to attach token automatically if stored in localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Store token after login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
