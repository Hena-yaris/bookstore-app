// src/api/axiosBase.js
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// const axiosBase = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosBase;



//////////////////////////
// axiosBase.js
import axios from "axios";

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Automatically attach token to every request
axiosBase.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosBase;

