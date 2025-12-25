import axios from "axios";
import { baseURL } from "./constant.js";

// Địa chỉ backend, đổi IP nếu cần

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
});


// Interceptor thêm token (nếu có)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
