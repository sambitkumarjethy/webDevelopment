import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const authService = {
  login(data) {
    return api.post(ENDPOINTS.AUTH.LOGIN, data);
  },

  logout() {
    return api.post(ENDPOINTS.AUTH.LOGOUT);
  },

  refresh() {
    return api.post(ENDPOINTS.AUTH.REFRESH);
  },
};
