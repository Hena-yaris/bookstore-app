// src/api/axiosBase.js
import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosBase;
