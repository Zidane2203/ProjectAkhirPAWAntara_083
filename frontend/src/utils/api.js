import axios from "axios";

const api = axios.create({
  baseURL: "http://10.69.12.205:3000/api", // sesuaikan dengan backend-mu
  withCredentials: true, // kalau pakai cookie JWT
});

// kalau pakai localStorage token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
