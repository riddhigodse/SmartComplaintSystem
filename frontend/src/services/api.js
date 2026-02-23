// src/services/api.js
import axios from "axios";

// Create axios instance pointing to /api (Netlify proxy will handle Render)
const API = axios.create({
  baseURL: "/api", // ✅ Important: Netlify will redirect /api/* to Render backend
  headers: {
    "Content-Type": "application/json",
  },
});

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