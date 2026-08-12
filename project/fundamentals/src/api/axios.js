import axios from "axios";
import { storage } from "../utils/storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  withCredentials: true,
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
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let refreshPromise = null;

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const status = error.response?.status;
//     const original = error.config;

//     if (
//       status === 401 &&
//       !original._retry &&
//       !original.url?.includes("/auth/")
//     ) {
//       original._retry = true;
//       try {
//         refreshPromise ??= api.post("/auth/refresh").then((res) => {
//           storage.setToken(res.data.accessToken);
//           return res.data.accessToken;
//         });
//         const newToken = await refreshPromise;
//         refreshPromise = null;
//         original.headers.Authorization = `Bearer ${newToken}`;
//         return api(original);
//       } catch (refreshErr) {
//         refreshPromise = null;
//         storage.clear();
//         window.location.href = "/login";
//         return Promise.reject(refreshErr);
//       }
//     }

//     switch (status) {
//       case 403:
//         alert("You don't have permission.");
//         break;
//       case 500:
//         console.error("Internal Server Error");
//         break;
//       default:
//         break;
//     }

//     return Promise.reject(error);
//   },
// );

export default api;
