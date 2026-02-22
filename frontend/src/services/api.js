// src/services/api.js
import axios from "axios";

// Create axios instance with LIVE backend URL
const API = axios.create({
  baseURL: "https://smartcomplaintsystem-1.onrender.com/api", // Render backend API
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token from localStorage to every request
API.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Error reading token from localStorage:", err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;