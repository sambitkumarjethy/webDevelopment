import axios from "axios";
import { storage } from "../utils/storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);
api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        storage.clear();

        window.location.href = "/login";
        break;

      case 403:
        alert("You don't have permission.");
        break;

      case 500:
        console.error("Internal Server Error");
        break;

      default:
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
