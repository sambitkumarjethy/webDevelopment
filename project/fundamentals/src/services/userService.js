import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const userService = {
  getUsers(params) {
    return api.get(ENDPOINTS.USERS, { params });
  },

  getUser(id) {
    return api.get(`${ENDPOINTS.USERS}/${id}`);
  },

  createUser(data) {
    return api.post(ENDPOINTS.USERS, data);
  },

  updateUser(id, data) {
    return api.put(`${ENDPOINTS.USERS}/${id}`, data);
  },

  deleteUser(id) {
    return api.delete(`${ENDPOINTS.USERS}/${id}`);
  },
};
