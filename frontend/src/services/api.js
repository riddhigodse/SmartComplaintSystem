// src/services/api.js
import axios from "axios";

// ✅ Hardcoded for local development - change this for production
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("🔧 API Base URL:", API.defaults.baseURL);

// Automatically attach token from localStorage to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;